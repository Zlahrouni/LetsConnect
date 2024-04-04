import "./ConversationWindow.css";

type ConversationWindowProps = {
  message: string;
};

function ConversationWindow({ message }: ConversationWindowProps) {
  return (
    <>
      <div className="row heading">
        <h1> WhattsNew Chat</h1>
      </div>
      <div className="row message" id="conversation">
        <div className="row message-body">
          <div className="col-sm-12 message-main-receiver">
            <div className="receiver">
              <p>JOHN:</p>
              <div className="message-text">
                Hi, how are you doing ?! It's been such a long time since we
                last chatted !
              </div>
              <span className="message-time pull-right">Sun</span>
            </div>
          </div>
        </div>
        {
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
        }
      </div>
    </>
  );
}

export default ConversationWindow;
