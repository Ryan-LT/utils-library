import { useRef } from 'react';

export const useDebounce = () => {
  const timeOut = useRef<ReturnType<typeof setTimeout>>();

  return (callback: () => void, time = 500) => {
    clearTimeout(timeOut.current);

    timeOut.current = setTimeout(() => {
      callback();
    }, time);
  };
};
