import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

function Modal({ children, openModal, onClose }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (openModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [openModal]);

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="w-[30vw] p-4 rounded-md backdrop:bg-stone-900/90 modal"
      data-testid="dialog-container"
    >
      {openModal && children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
