import { SetStateAction, useEffect, useState } from 'react';

const useCountdown = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time]);

  const startTimer = (initialTimeInSeconds: SetStateAction<number>) => {
    setTime(initialTimeInSeconds);
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
  };

  return {
    time,
    isActive,
    startTimer,
    resetTimer,
  };
};

export default useCountdown;
