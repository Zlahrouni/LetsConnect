import { Socket } from "socket.io-client";

export type ChatPageProps = {
  socket: Socket;
};

export type Message = {
  id: string;
  name: string;
  text: string;
  date: string;
};

export type LoginPageProps = {
  socket: Socket;
};

export type ConversationWindowProps = {
  messages: Message[];
};

export type SendMessageProps = {
    socket: Socket;
  };