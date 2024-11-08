import { useEffect } from 'react';
import Progress from './common/Progress';

const TOTAL_TIME = 5000;

function DeleteConfirmationDialog({ onCancel, onConfirm }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TOTAL_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  const buttonStyle = 'w-12 px-2 py-1 rounded-md';

  return (
    <div className="flex flex-col gap-y-2">
      <p className="mb-2 font-bold text-2xl" data-testid="dialog-title">
        Delete Place
      </p>
      <p className="mb-2" data-testid="dialog-message">
        Are you sure you want to delete this place ?
      </p>
      <form method="dialog">
        <div
          className="flex justify-between items-center font-bold"
          data-testid="delete-confirmation-dialog-btn-container"
        >
          <Progress
            totalTime={TOTAL_TIME}
            data-testid="deletion-timeout-progress"
          />
          <div className="flex gap-x-2">
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
        </div>
      </form>
    </div>
  );
}

export default DeleteConfirmationDialog;
