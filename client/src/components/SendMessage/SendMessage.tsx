import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Socket } from "socket.io-client";
import { useState } from "react";
import "./SendMessage.css";

type SendMessageProps = {
  socket: Socket;
};

function SendMessage({ socket }: SendMessageProps) {
  const [message, setMessage] = useState("");
  let date = new Date();
  let options = { weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  let formattedDate = date.toLocaleDateString('en-UK', options);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("client-to-server", {
        name: localStorage.getItem("userName"),
        text: message,
        date: formattedDate,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <form className="row reply d-flex flex-column" onSubmit={handleSendMessage}>
      <div className="col-sm-11 col-xs-11 reply-main">
        <label className="sr-only" htmlFor="comment">
          Reply
        </label>
        <textarea
          className="form-control"
          id="comment"
          role=""
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          value={message}
          autoFocus
        />
      </div>
      <div>
        <button className="btn">
          <FontAwesomeIcon
            icon={faPaperPlane}
            size="2x"
            className="reply-send"
          />
        </button>
      </div>
    </form>
  );
}

export default SendMessage;
