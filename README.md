# WhatsApp-like App

This is a real-time chat application similar to WhatsApp, built with TypeScript, RabbitMQ, Socket.IO, and React.

## Preview

![Preview of the application](Preview.png)

## Features

- Login (without account creation)
- Real-time text messaging with every person connected

## Technologies Used

- TypeScript: A statically typed superset of JavaScript that adds types to the language.
- RabbitMQ: An open-source message-broker software that originally implemented the Advanced Message Queuing Protocol (AMQP).
- Socket.IO: A JavaScript library for real-time web applications. It enables real-time, bidirectional and event-based communication between the browser and the server.
- React: A JavaScript library for building user interfaces.

## Getting Started

### Requirements

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Docker](https://www.docker.com/get-started), [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm).

### Installation
1. Clone the repository to your local machine.
2. Navigate to the `server` directory and install the required dependencies with `npm install`.
3. Run the container RabbitMQ with `npm run rabbitmq`.
4. Start the server with `npm start`.
5. Navigate to the `client` directory and install the required dependencies with `npm install`.
6. Start the client with `npm run dev`.
7. Open your browser and navigate to `http://localhost:5173` to start using the application.

## Authors

This project was created by:
- Zlahrouni - [Official Website](https://ziadlahrouni.com)
- Sabevi - [GitHub](https://github.com/sabevi)
- Tamdasab - [GitHub](https://github.com/tamdasab)


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [ISC License](LICENSE).