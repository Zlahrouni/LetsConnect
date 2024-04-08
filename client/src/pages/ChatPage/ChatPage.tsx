import { useState } from "react";
import { Socket } from 'socket.io-client';
import ConversationWindow from "../../components/ConversationWindow/ConversationWindow";
import Logout from "../../components/Logout/Logout";
import SendMessage from "../../components/SendMessage/SendMessage";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ChatPage.css";

type ChatPageProps = {
  socket: Socket;
};

function ChatPage({ socket }: ChatPageProps) {
  const [message, setMessage] = useState("");
  const addMessage = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage((e.target as HTMLTextAreaElement).value);
  }

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
          <ConversationWindow message={message} />
          <SendMessage addMessage={addMessage} message={message} />
        </div>
      </div>
    </main>
  );
}

export default ChatPage;
