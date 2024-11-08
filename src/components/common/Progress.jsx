import { useEffect, useState } from 'react';

const INTERVAL_TIME = 10;

function Progress({ totalTime, ...props }) {
  const [remainingTime, setRemainingTime] = useState(totalTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(
        (prevRemainingTime) => prevRemainingTime - INTERVAL_TIME
      );
    }, INTERVAL_TIME);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <progress value={remainingTime} max={totalTime} {...props} />
    </>
  );
}

export default Progress;
