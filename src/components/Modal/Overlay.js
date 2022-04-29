import * as ReactDOM from "react-dom";

const Overlay = props => {
  return <section id="overlay" onClick={props.onOverlayClick} style={{display: `${props.isVisible ? 'block':'none'}` }}></section>;
};

ReactDOM.createPortal(Overlay, document.getElementById("root"));

export default Overlay;
