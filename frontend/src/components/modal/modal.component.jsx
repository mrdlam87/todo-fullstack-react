import "./modal.style.scss";

const Modal = ({ children, show }) => {
  return show ? <div className={"modal-container"}>{children}</div> : null;
};

export default Modal;
