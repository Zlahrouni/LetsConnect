import { ConversationWindowProps } from "../../types/types";
import "./ConversationWindow.css";

function ConversationWindow({ messages }: ConversationWindowProps) {
  return (
    <>
      <div className="row heading">
        <h1> WhattsNew Chat</h1>
      </div>
      <div className="row message" id="conversation">
        {messages.map((message) =>
          localStorage.getItem("name") === message.name ? (
            <div key={message.id} className="row message-body">
              <div className="col-sm-12 message-main-receiver">
                <div className="receiver">
                  <p>{message.name}</p>
                  <div className="message-text">{message.text}</div>
                  <span className="message-time pull-right">{message.date}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="row message-body">
              <div className="col-sm-12 message-main-sender">
                <div className="sender">
                  <p>{message.name}</p>
                  <div className="message-text">{message.text}</div>
                  <span className="message-time pull-right">{message.date}</span>
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
