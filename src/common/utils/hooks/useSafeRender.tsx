import React, { useEffect } from 'react';

const useSafeRender = (cb: () => void) => {
  const mounted = React.useRef<boolean>(false);

  useEffect(() => {
    async function fetchRequest() {
      mounted.current = true;
      cb();
    }
    fetchRequest();
    return () => {
      mounted.current = false;
    };
  }, [mounted]);

  return mounted;
};

export default useSafeRender;
