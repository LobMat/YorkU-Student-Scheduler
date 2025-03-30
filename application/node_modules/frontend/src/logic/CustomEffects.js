import { useEffect, useRef } from "react";
// 1) effect hook that does not run on the first render, and only calls func() on subsequent dependency changes.
export const useMountedEffect = (func, deps) => {

  const mounted = useRef(false);
  
  useEffect(() => {
    if (mounted.current) func();
    else mounted.current = true;
  }, deps);

}

// 2) effect hook that does not run on the first render. it calls func1() on the first dependency change and func2() on subsequent changes.
export const useMountedEffectOnce = (func1, func2, deps) => {

  const ready = useRef(2);
  
  useEffect(() => {
    switch (ready.current) {
      case 0:  
        func2?.();
        break;
      case 1:   
        ready.current--;
        func1(); 
        break;
      case 2:
        ready.current--; 
        break;
    }
  }, deps);
}
