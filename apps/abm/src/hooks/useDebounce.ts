import { useEffect, useState } from 'react';

export const useDebounce = (value: string = '', delay: number = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      setDebounceValue(value);
      setLoading(false);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return { debounceValue, loading, setLoading };
};
