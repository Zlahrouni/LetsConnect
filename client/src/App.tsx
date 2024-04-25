import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import "./index.css";
import ChatPage from "./pages/ChatPage/ChatPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotConnected from "./components/NotConnected/NotConnected.tsx";
import { Message } from "./types/types.tsx";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const socket = io("http://localhost:4000");
  const [messages, setMessages] = useState<Message[]>([]);

  function addMessage(message: Message) {
    setMessages((messages) => [...messages, message]);
  }

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("connect_error", (error) => {
      console.log("Connection to the server failed", error);
      setIsConnected(false);
    });

    socket.on("messageHistory", (messageHistory: Message[]) => {
      setMessages(messageHistory);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("messageHistory");
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="pageContainer">
        <Routes>
          <Route
            path="/"
            element={
              isConnected ? <LoginPage socket={socket} /> : <NotConnected />
            }
          ></Route>
          <Route
            path="/chat"
            element={
              isConnected ? (
                <ChatPage
                  socket={socket}
                  messages={messages}
                  addMessage={addMessage}
                />
              ) : (
                <NotConnected />
              )
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
