import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import "./index.css";
import ChatPage from "./pages/ChatPage/ChatPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ErrorServer from "./components/ErrorServer/ErrorServer.tsx";
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

    // Cleanup function to stop listening
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("messageHistory");
    };
  }, 
  // Empty dependency array so the effect only runs once
  []);

  return (
    <BrowserRouter>
      <div className="pageContainer">
        <Routes>
          {/* Route for the home page */}
          <Route
            path="/"
            element={
              isConnected ? <LoginPage socket={socket} /> : <ErrorServer />
            }
          />
          {/* Route for the chat page */}
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
                <ErrorServer />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
