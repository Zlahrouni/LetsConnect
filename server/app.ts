import express from "express";
import { Server } from "socket.io";
import amqp from "amqplib/callback_api";
import { Message } from "./types/types";
import { v4 as uuidv4 } from "uuid";

export class App {
  private express = express();
  private httpServer: any;
  private users: Array<{ username: string; online: boolean }> = [];
  private messageHistory: Message[] = [];

  constructor(port: number = 3000) {
    this.configureServer(port);
    this.configureIO();
    //this.connectToRabbitMQ();
  }

  /**
   * Configure the Express server
   * @private
   */
  private configureServer(port: number) {
    this.httpServer = this.express.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  /**
   * Configure the Socket.IO server
   * @private
   */
  private configureIO() {
    const io = new Server(this.httpServer, { cors: { origin: "*" } }); // Allow all origins for development

    // RabbitMQ's connection details
    const rabbitmqUrl = "amqp://localhost:5672";

    // Connect to RabbitMQ
    amqp.connect(rabbitmqUrl, (err, conn) => {
      // Handle connection errors
      if (err) {
        console.error("Error connecting to RabbitMQ:", err);
        process.exit(1);
      }

      // Create a channel
      conn.createChannel((err, ch) => {
        if (err) {
          console.error("Error creating RabbitMQ channel:", err);
          process.exit(1);
        }

        const chatMessages = "chat_messages";
        const usersQueue = "users";

        // Add a queue
        ch.assertQueue(chatMessages, { durable: false });
        ch.assertQueue(usersQueue, { durable: false });

        // Read the users queue and set the users array with the data from the queue
        ch.consume(usersQueue, (msg) => {
          if (msg) {
            this.users = JSON.parse(msg.content.toString());
            console.log("First Users array updated:", this.users);
          }
        });

        // Read the chat messages queue and set the messageHistory array with the data from the queue
        ch.consume(chatMessages, (msg) => {
          if (msg) {
            console.log("Message history array:", this.messageHistory);
            const newMessage: Message = JSON.parse(msg.content.toString());
            this.messageHistory.push(newMessage);
            console.log(
              "First Message history array updated:",
              this.messageHistory
            );
          }

          if (this.messageHistory.length > 100) {
            this.messageHistory.shift();
          }
        });

        // Listen for messages in the queue
        io.on("connection", (socket) => {
          console.log("A user connected");

          // Send the message history to the client
          socket.emit("messageHistory", this.messageHistory);

          // Handle messages from clients
          socket.on("client-to-server", (messageObject) => {
            console.log("Received message:", messageObject);
            let messageToStore: Message = {
              id: uuidv4(),
              name: messageObject.name,
              message: messageObject.message,
              date: new Date().toLocaleString(),
            };
            // Send message to RabbitMQ queue
            ch.sendToQueue(
              chatMessages,
              Buffer.from(JSON.stringify(messageToStore))
            );

            socket.emit("messageHistory", this.messageHistory);

            // Send message to all clients
            io.emit("server-to-client", messageToStore);
          });

          socket.on("login", (data) => {
            console.log("User logged in:", data);

            // Add the user to the users array or change their online status if they are already in the array
            const user = this.users.find(
              (user) => user.username === data.username
            );

            if (user) {
              user.online = true;
            } else {
              this.users.push({ username: data.username, online: true });
            }

            // Purge the queue because we need to have one message in the queue which is the list of users
            ch.purgeQueue(usersQueue, (err, ok) => {
              if (err) {
                console.error("Error purging RabbitMQ queue:", err);
                return;
              }

              console.log("Successfully purged the users queue");

              // Send the users array to the RabbitMQ login queue
              ch.sendToQueue(
                usersQueue,
                Buffer.from(JSON.stringify(this.users))
              );

              this.users = [];
              console.log("Users array purged:", this.users);

              ch.consume(usersQueue, (msg) => {
                if (msg) {
                  this.users = JSON.parse(msg.content.toString());
                  console.log("Users array updated:", this.users);
                  io.emit("users", this.users);
                }
              });

              socket.emit("loginsuccess", { username: data.username });
            });
          });

          socket.on("logout", (data, callback) => {
            console.log("User want to logout:", data);
            // Find the user in the users array
            const user = this.users.find(
              (user) => user.username === data.username
            );

            // If the user is found, set their online status to false
            if (user) {
              user.online = false;
            }

            // Purge the queue because we need to have one message in the queue which is the list of users
            ch.purgeQueue(usersQueue, (err, ok) => {
              if (err) {
                console.error("Error purging RabbitMQ queue:", err);
                return;
              }
              // Send the updated users array to the RabbitMQ users queue
              ch.sendToQueue(
                usersQueue,
                Buffer.from(JSON.stringify(this.users))
              );

              ch.consume(usersQueue, (msg) => {
                if (msg) {
                  this.users = JSON.parse(msg.content.toString());
                  console.log("Users array updated:", this.users);
                  io.emit("users", this.users);
                }
              });

              // callBack to the client
              callback({});
            });
          });

          // This socket used by the client to ged all the users connected and disconnected
          socket.on("getUsers", () => {
            console.log("Get users:", this.users);
            socket.emit("users", this.users);
          });

          // Handle disconnections, not done
          socket.on("disconnect", () => {
            console.log("A user disconnected");
          });
        });
      });
    });
  }
}