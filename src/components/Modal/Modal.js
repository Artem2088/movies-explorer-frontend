import { React, useState, useEffect } from "react";
import "./Modal.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ title, span, modal }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (modal) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [modal]);

  return (
    <div className={`${open ? "modal " : "modal-hidden "}`}>
      <div className='modal__overlay'>
        <button onClick={() => setOpen(false)} className='button modal__close'>
          <AiOutlineClose size={44} />
        </button>
      </div>
      <div className='modal__container'>
        <h3 className='modal__title'>{title}</h3>
        <span className='modal__span'>{span}</span>
      </div>
    </div>
  );
};

export default Modal;
