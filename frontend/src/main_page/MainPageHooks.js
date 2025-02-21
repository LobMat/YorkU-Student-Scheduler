import { useEffect, useRef } from 'react';

// the callback function is executed only when the dependencies are updated and not on first render. 
export const useMountedEffect = (callback, dependencies) => {
    const mounted = useRef(false);

    useEffect(() => {
        if (mounted.current) callback();
        else mounted.current = true;
    }, dependencies);
}

export const useMountedMemo = (callback, dependencies) => {
  const mounted = useRef(false);

  useEffect(() => {
      if (mounted.current) callback();
      else mounted.current = true;
  }, dependencies);
}