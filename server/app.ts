import express from "express";
import { Server, Socket } from "socket.io";
import amqp from "amqplib/callback_api";
import { Message } from "./types/types";
import { v4 as uuidv4 } from "uuid";
import { Channel, Connection, Message as AmqpMessage } from 'amqplib/callback_api';

export class App {
  private express = express();
  private httpServer: any;
  private users: Array<{ username: string; online: boolean }> = [];
  private messageHistory: Message[] = [];

  constructor(port: number = 3000) {
    this.configureServer(port);
    this.configureIO();
  }

  /**
   * Configure the Express server
   * @private
   */
  private configureServer(port: number): void {
    this.httpServer = this.express.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  /**
   * Configure the Socket.IO server
   * @private
   */
  private configureIO(): void {
    const io: Server = new Server(this.httpServer, { cors: { origin: "*" } });
    const rabbitmqUrl: string = "amqp://localhost:5672";

    amqp.connect(rabbitmqUrl, (err: Error, conn: Connection): void => {
      if (err) {
        console.error("Error connecting to RabbitMQ:", err);
        process.exit(1);
      }

      conn.createChannel((err: Error, ch: Channel) => {
        if (err) {
          console.error("Error creating RabbitMQ channel:", err);
          process.exit(1);
        }

        const messagesQueue: string = "chat_messages";
        const usersQueue: string = "users";

        // assert the queues
        ch.assertQueue(messagesQueue, { durable: false });
        ch.assertQueue(usersQueue, { durable: false });

        // Read the users queue and set the users array with the data from the queue
        ch.consume(usersQueue, (msg: AmqpMessage | null): void => {
          if (msg) {
            this.users = JSON.parse(msg.content.toString());
            console.log("Users array updated:", this.users);
          }
        });

        // Read the chat messages queue and set the messageHistory array with the data from the queue
        ch.consume(messagesQueue, (msg: AmqpMessage| null) => {
          if (msg) {
            const newMessage: Message = JSON.parse(msg.content.toString());
            this.messageHistory.push(newMessage);
            console.log(
              "Message history array updated:",
              this.messageHistory
            );
          }

          if (this.messageHistory.length > 100) {
            this.messageHistory.shift();
          }
        });

        // Listen for messages in the queue
        io.on("connection", (socket: Socket) => {

          // Send the message history to the client
          socket.emit("messageHistory", this.messageHistory);

          // Handle messages sent from clients
          socket.on("client-to-server", (messageObject: { name: string, message: string }) => {
            let messageToStore: Message = {
              id: uuidv4(),
              name: messageObject.name,
              message: messageObject.message,
              date: new Date().toLocaleString(),
            };

            ch.sendToQueue(
              messagesQueue,
              Buffer.from(JSON.stringify(messageToStore))
            );

            // send message history to the client who sent + all clients
            socket.emit("messageHistory", this.messageHistory);
            io.emit("server-to-client", messageToStore);
          });

          socket.on("login", (data: { username: string }) => {
            const user = this.users.find(
              (user:{ username: string, online: boolean }) => user.username === data.username
            );
            if (user) {
              user.online = true;
            } else {
              this.users.push({ username: data.username, online: true });
            }

            // Purge the queue because we only want recent users
            ch.purgeQueue(usersQueue, (err: Error | null) => {
              if (err) {
                console.error("Error purging RabbitMQ queue:", err);
                return;
              }

              // Send the latest users array to the RabbitMQ users queue
              ch.sendToQueue(
                usersQueue,
                Buffer.from(JSON.stringify(this.users))
              );

              this.users = [];

              ch.consume(usersQueue, (msg: AmqpMessage | null) => {
                if (msg) {
                  this.users = JSON.parse(msg.content.toString());
                  io.emit("users", this.users);
                }
              });

              socket.emit("loginsuccess", { username: data.username });
            });
          });

          socket.on("logout", (data: { username: string }, callback: (arg: {}) => void) => {
            // Find the user in the users array
            const user = this.users.find(
              (user) => user.username === data.username
            );

            if (user) {
              user.online = false;
            }

            ch.purgeQueue(usersQueue, (err: Error | null) => {
              if (err) {
                console.error("Error purging RabbitMQ queue:", err);
                return;
              }
              // Send the updated users array to the RabbitMQ users queue
              ch.sendToQueue(
                usersQueue,
                Buffer.from(JSON.stringify(this.users))
              );

              ch.consume(usersQueue, (msg: AmqpMessage | null) => {
                if (msg) {
                  this.users = JSON.parse(msg.content.toString());
                  io.emit("users", this.users);
                }
              });

              // reply to the client
              callback({});
            });
          });

          // Socket used by the client to get all the connected and disconnected users
          socket.on("getUsers", () => {
            socket.emit("users", this.users);
          });

          socket.on("disconnect", () => {
            console.log("A user disconnected");
          });
        });
      });
    });
  }
}
