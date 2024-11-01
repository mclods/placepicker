import { useImperativeHandle } from 'react';
import { useRef } from 'react';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({ title, message }, ref) {
  const dialogRef = useRef();

  useImperativeHandle(ref, function () {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialogRef}>
      <p>{title}</p>
      <p>{message}</p>
      <form method="dialog">
        <button>No</button>
        <button>Yes</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
