import React from "react";
import "./styles.scss";

export default function Modal(props) {
  const { isOpen, onClose, children, className } = props;

  if (!isOpen) {
    return null;
  } else {
    return (
      <div className={"modal " + (className || "") + (isOpen ? " modal-is-open" : " ")}>
        <div className="modal-overlay" onClick={onClose} />
        <div className={"modal-content"}>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  }
}
