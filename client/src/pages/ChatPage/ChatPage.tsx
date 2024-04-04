import ConversationWindow from "../../components/ConversationWindow/ConversationWindow";
import Logout from "../../components/Logout/Logout";
import SendMessage from "../../components/SendMessage/SendMessage";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ChatPage.css";

function ChatPage() {
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
          <ConversationWindow />
          <SendMessage />
        </div>
      </div>
    </main>
  );
}

export default ChatPage;
