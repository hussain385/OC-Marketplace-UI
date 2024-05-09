import { useState } from 'react';

type Props = {
  key: string;
  value?: string;
};

const useLocalStorage = ({ key, value }: Props) => {
  const getItem = localStorage.getItem(key);

  const { parse } = JSON;

  const parseData = getItem ? parse(getItem) : value ? value : '';

  const [state, setState] = useState(() => {
    parseData ? parseData : 'Data is calling';
  });
  return [state, setState];
};

export default useLocalStorage;
