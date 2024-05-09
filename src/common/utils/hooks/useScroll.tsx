import { useCallback, useEffect } from 'react';

type Props = {
  useEffectDep: any[];
};

const useScroll = ({ useEffectDep }: Props) => {
  const scrollPosition = useCallback(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }), []);

  useEffect(() => {
    scrollPosition();
  }, useEffectDep);
};

export default useScroll;
