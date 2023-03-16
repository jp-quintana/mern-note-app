import { useEffect } from 'react';

export const usePageClass = (className) => {
  useEffect(() => {
    document.documentElement.classList.add(className);
    document.body.classList.add(className);
    return () => {
      document.documentElement.classList.remove(className);
      document.body.classList.remove(className);
    };
  }, []);
};
