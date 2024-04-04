import "./SendMessage.css";

function SendMessage() {
  return (
    <div className="row reply">
      <div className="col-sm-11 col-xs-11 reply-main">
        <textarea className="form-control" id="comment"></textarea>
      </div>
      <div className="col-sm-1 col-xs-1 reply-send">
        <i className="fa fa-send fa-2x" aria-hidden="true"></i>
      </div>
    </div>
  );
}

export default SendMessage;
