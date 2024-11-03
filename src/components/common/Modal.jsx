import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

function Modal({ title, message, dialogButtons, openModal }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (openModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [openModal]);

  const buttons = dialogButtons ?? <button>Close</button>;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="w-[30vw] p-4 rounded-md backdrop:bg-stone-900/90 modal"
      data-testid="dialog-container"
    >
      <p className="mb-2 font-bold text-2xl" data-testid="dialog-title">
        {title}
      </p>
      <p className="mb-2" data-testid="dialog-message">
        {message}
      </p>
      <form method="dialog">{buttons}</form>
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
