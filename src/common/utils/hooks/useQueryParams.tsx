import { NavigateOptions, useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

/**
 * Get Search Parameters Hook
 *
 */
function useQueryParams(): [URLSearchParams, (key: string, value: string, navigateOpts?: NavigateOptions) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => {
    const newParam = new URLSearchParams();
    searchParams.forEach((value, key) => {
      newParam.set(key, decodeURIComponent(value));
    });
    return newParam;
  }, [searchParams]);

  const setParams = useCallback(
    (key: string, value: string, navigateOpts?: NavigateOptions) => {
      const trimValue = value.trim();
      const encodedValue = encodeURIComponent(trimValue);

      setSearchParams((prev) => {
        if (trimValue === '') {
          prev.delete(key);
        } else {
          prev.set(key, encodedValue);
        }

        return prev;
      }, navigateOpts);
    },
    [setSearchParams],
  );

  return [params, setParams];
}

export default useQueryParams;
