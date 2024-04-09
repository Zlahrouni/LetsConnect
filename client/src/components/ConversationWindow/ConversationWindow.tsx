import "./ConversationWindow.css";

type ConversationWindowProps = {
  messages: string[];
};

function ConversationWindow({ messages }: ConversationWindowProps) {
  console.log(messages);
  return (
    <>
      <div className="row heading">
        <h1> WhattsNew Chat</h1>
      </div>
      <div className="row message" id="conversation">
        {messages.map((message, index) => (
          <div key={index} className="row message-body">
            <div className="col-sm-12 message-main-receiver">
              <div className="receiver">
                <p>{message.name}</p>
                <div className="message-text">{message.text}</div>
                <span className="message-time pull-right">Sun</span>
              </div>
            </div>
          </div>
        ))}

        {/* {
          message && (
            <div className="row message-body">
            <div className="col-sm-12 message-main-sender">
              <div className="sender">
                <p>PAUL:</p>
                <div className="message-text">{message}</div>
                <span className="message-time pull-right">Sun</span>
              </div>
            </div>
          </div>
          )
        } */}
      </div>
    </>
  );
}

export default ConversationWindow;
