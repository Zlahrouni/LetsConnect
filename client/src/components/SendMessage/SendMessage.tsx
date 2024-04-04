import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./SendMessage.css";

type SendMessageProps = {
  addMessage: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  message: string;
};

function SendMessage({ addMessage, message }: SendMessageProps) {
  return (
    <div className="row reply d-flex flex-column">
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
      <div>
        <button className="btn">
          <FontAwesomeIcon icon={faPaperPlane} size="2x" />
        </button>
      </div>
    </div>
  );
}

export default SendMessage;
