import { useEffect } from 'react';

const useStorageListener = (key: string, cb: (e: unknown) => void) => {
  useEffect(() => {
    window.addEventListener(key, cb);

    return () => {
      window.removeEventListener(key, cb);
    };
  }, [cb, key]);
};

export default useStorageListener;
