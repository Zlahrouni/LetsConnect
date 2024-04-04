import "./SendMessage.css";

type SendMessageProps = {
  addMessage: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  message: string;
};

function SendMessage ({ addMessage, message }: SendMessageProps) {
  return (
    <div className="row reply">
      <div className="col-sm-11 col-xs-11 reply-main">
        <label className="sr-only" htmlFor="comment">
          Reply
        </label>
        <textarea
          className="form-control"
          id="comment"
          role=""
          onChange={addMessage}
          value={message}
          autoFocus
        ></textarea>
      </div>
      <div className="col-sm-1 col-xs-1 reply-send">
        <i className="fa fa-send fa-2x" aria-hidden="true"></i>
      </div>
    </div>
  );
}

export default SendMessage;
