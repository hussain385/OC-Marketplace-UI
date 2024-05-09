import { useCallback, useState } from 'react';
import { Draft, freeze, produce } from 'immer';

export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];

/**
 *  Immer hook just like useState with immer
 *  uses same object assign like redux toolkit slice
 */
function useImmer<T = any>(initialValue: T): ImmerHook<T> {
  const [val, updateValue] = useState(() => freeze(initialValue, true));

  return [
    val,
    useCallback((updater) => {
      if (typeof updater === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        updateValue(produce(updater));
      } else {
        updateValue(freeze(updater));
      }
    }, []),
  ];
}

export default useImmer;
