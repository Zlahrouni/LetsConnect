import { Socket } from "socket.io-client";

export type ChatPageProps = {
  socket: Socket;
  messages: Message[];
  addMessage: (message: Message) => void;
};

export type Message = {
  id: string;
  name: string;
  message: string;
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

export type LoginProps = {
  socket: Socket;
};

export type Logout = {
  socket: Socket;
};

export type SidebarBlock = {
  socket: Socket;
};

export type User = { username: string; online: boolean };
