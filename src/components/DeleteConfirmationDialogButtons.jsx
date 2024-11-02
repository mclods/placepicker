function DeleteConfirmationDialogButtons({ onCancel, onConfirm }) {
  const buttonStyle = 'w-12 px-2 py-1 rounded-md';

  return (
    <div
      className="flex justify-end gap-2 font-bold"
      data-testid="delete-confirmation-dialog-btn-container"
    >
      <button
        className={`${buttonStyle} active:shadow-inner`}
        onClick={onCancel}
        data-testid="no-btn"
      >
        No
      </button>
      <button
        className={`${buttonStyle} text-white bg-red-500 active:bg-red-600`}
        onClick={onConfirm}
        data-testid="yes-btn"
      >
        Yes
      </button>
    </div>
  );
}

export default DeleteConfirmationDialogButtons;
