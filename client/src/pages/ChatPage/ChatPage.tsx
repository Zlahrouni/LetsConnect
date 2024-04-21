import { useEffect, useState } from "react";
import ConversationWindow from "../../components/ConversationWindow/ConversationWindow";
import Logout from "../../components/Logout/Logout";
import SendMessage from "../../components/SendMessage/SendMessage";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ChatPage.css";
import { ChatPageProps, Message } from "../../types/types";
import { useNavigate } from "react-router-dom";

function ChatPage({ socket }: ChatPageProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("server-to-client", (messageObject: Message) => {
      setMessages((messages) => [...messages, messageObject]);
    });

    socket.on("logoutsuccess", () => {
      localStorage.removeItem("username");
      console.log("logout success");
      navigate("/");
    });

    return () => {
      socket.off("server-to-client");
    };
  }, [socket]);

  // console.log("messages", messages);
  return (
    <main className="container app">
      <div className="row app-one">
        <div className="col-sm-3 side">
          <div className="side-one">
            <Sidebar socket={socket} />
          </div>
        </div>
        <div className="col-sm-9 conversation">
          <ConversationWindow messages={messages} />
          <SendMessage socket={socket} />
          <Logout socket={socket} />
        </div>
      </div>
    </main>
  );
}

export default ChatPage;
