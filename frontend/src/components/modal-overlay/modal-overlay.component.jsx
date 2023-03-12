import "./modal-overlay.style.scss";

const ModalOverlay = ({ show, onClick }) => {
  return show ? <div className={"modal-overlay"} onClick={onClick} /> : null;
};

export default ModalOverlay;
