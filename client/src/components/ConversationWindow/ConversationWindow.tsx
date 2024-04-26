import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand } from "@fortawesome/free-solid-svg-icons";
import { ConversationWindowProps } from "../../types/types";
import "./ConversationWindow.css";
import { useRef, useEffect } from "react";

function ConversationWindow({ messages }: ConversationWindowProps) {
  const userName = localStorage.getItem("username");
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Use the useEffect hook to scroll to the last message every time the messages array changes
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Header */}
      <div className="row heading">
        <h1 className="text-center">
          {" "}
          Welcome {userName}{" "}
          <FontAwesomeIcon icon={faHand} size="2x" className="hand" />
        </h1>
      </div>
      {/* Conversation */}
      <div className="message" id="conversation">
        {messages.map((message) =>
          // If the message is from the current user, display it on the right
          userName === message.name ? (
            <div key={message.id} className="row message-body">
              <div className="col-sm-12 message-main-sender">
                <div className="sender">
                  <p>{message.name}</p>
                  <div className="message-text">{message.message}</div>
                  <span className="message-time pull-right">
                    {message.date}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // If the message is from the another users, display it on the left
            <div
              key={message.id}
              className="row message-body"
              ref={lastMessageRef}
            >
              <div className="col-sm-12 message-main-receiver">
                <div className="receiver">
                  <p>{message.name}</p>
                  <div className="message-text">{message.message}</div>
                  <span className="message-time pull-right">
                    {message.date}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default ConversationWindow;
