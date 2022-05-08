import * as ReactDOM from "react-dom";

const ErrorMessage = (props) => {
  return (
    <div className="error_message__container">
      <div className="error-message__modal">
        {props.errorMessage}
        <div>
          <button className="btn" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createPortal(ErrorMessage, document.getElementById("root"));

export default ErrorMessage;
