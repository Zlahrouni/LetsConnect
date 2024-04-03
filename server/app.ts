import express from 'express';
import { Server } from 'socket.io';
import amqp from 'amqplib/callback_api';

export class App {
    private express = express();
    private httpServer: any;

    constructor(port: number = 3000) {
        this.configureServer(port);
        this.configureIO();
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
        const io = new Server(this.httpServer, { cors: { origin: '*' } }); // Allow all origins for development

        // RabbitMQ connection details
        const rabbitmqUrl = 'amqp://localhost:5672';

        // Connect to RabbitMQ
        amqp.connect(rabbitmqUrl, (err, conn) => {
            // Handle connection errors
            if (err) {
                console.error('Error connecting to RabbitMQ:', err);
                process.exit(1);
            }

            // Create a channel
            conn.createChannel((err, ch) => {
                if (err) {
                    console.error('Error creating RabbitMQ channel:', err);
                    process.exit(1);
                }

                // The queue name that will be used to store clients messages
                const queueName = 'chat_messages';

                // Add a queue
                ch.assertQueue(queueName, { durable: false });

                // Listen for messages in the queue
                io.on('connection', (socket) => {
                    console.log('A user connected');

                    // Handle messages from clients
                    socket.on('client-to-server', (message) => {
                        console.log('Received message:', message);

                        // Send message to RabbitMQ queue
                        ch.sendToQueue(queueName, Buffer.from(message));

                        // Send message to client TODO : the message need to be send to all clients
                        socket.emit('server-to-client', message);
                    });

                    // Handle disconnections
                    socket.on('disconnect', () => {
                        console.log('A user disconnected');
                    });
                });
            });
        });
    }
}

