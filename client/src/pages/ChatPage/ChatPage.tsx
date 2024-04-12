import { useEffect, useState } from "react";
import ConversationWindow from "../../components/ConversationWindow/ConversationWindow";
import Logout from "../../components/Logout/Logout";
import SendMessage from "../../components/SendMessage/SendMessage";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ChatPage.css";
import { ChatPageProps, Message } from "../../types/types";

function ChatPage({ socket }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('server-to-client', (data) => 
    setMessages((prevMessages) => [...prevMessages, data]));
  }, [socket]);

  console.log(messages);

  return (
    <main className="container app">
      <div className="row app-one">
        <div className="col-sm-4 side">
          <div className="side-one">
            <Logout />
            <Sidebar />
          </div>
        </div>
        <div className="col-sm-8 conversation">
          <ConversationWindow messages={messages} />
          <SendMessage
            socket={socket}
          />
        </div>
      </div>
    </main>
  );
}

export default ChatPage;
