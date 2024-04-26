import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./SendMessage.css";
import { SendMessageProps } from "../../types/types";

function SendMessage({ socket }: SendMessageProps) {
  // State for managing the message input field
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("username")) {
      socket.emit("client-to-server", {
        name: localStorage.getItem("username"),
        message: message,
      });
    }
    // Clear the message input field after sending the message
    setMessage("");
  };

  return (
    <form className="row reply d-flex flex-column" onSubmit={handleSendMessage}>
      <div className="col-sm-11 col-xs-11 reply-main">
        <label className="sr-only" htmlFor="message">
          Reply
        </label>
        <textarea
          className="form-control"
          id="message"
          placeholder="Enter your message..."
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
        <button className="btn send">
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
