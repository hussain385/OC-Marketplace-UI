import { useState, useEffect } from 'react';

const useTitle = (title: string) => {
  const [titleHead] = useState(title);

  useEffect(() => {
    document.title = titleHead;
  }, [titleHead]);
};

export default useTitle;
