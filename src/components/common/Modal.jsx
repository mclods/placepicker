import { useImperativeHandle } from 'react';
import { useRef } from 'react';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = forwardRef(function Modal(
  { title, message, dialogButtons },
  ref
) {
  const dialogRef = useRef();

  useImperativeHandle(ref, function () {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

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
});

export default Modal;
