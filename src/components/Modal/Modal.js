import React from "react";
import "./Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Modal = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`${open ? "modal " : "modal-hidden "}`}>
      <div className='modal__overlay'>
        <button onClick={() => setOpen(false)} className='button modal__close'>
          <AiOutlineClose size={44} />
        </button>
      </div>
      <div className='modal__container'>
        <h3 className='modal__title'>Привет, Артем!</h3>
        <span className='modal__span'>Произошла ошибка, попробуйте снова!</span>
      </div>
    </div>
  );
};

export default Modal;
