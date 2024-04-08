import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Socket } from "socket.io-client";
import { useState } from "react";
import "./SendMessage.css";

type SendMessageProps = {
  socket: Socket;
};

function SendMessage({ socket }: SendMessageProps) {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('client-to-server', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
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
          value={message}
          autoFocus
        ></textarea>
      </div>
      <div>
        <button className="btn">
          <FontAwesomeIcon icon={faPaperPlane} size="2x" className="reply-send" />
        </button>
      </div>
    </form>
  );
}

export default SendMessage;
