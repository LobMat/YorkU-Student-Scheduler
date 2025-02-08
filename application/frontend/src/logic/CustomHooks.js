// this file contains custom hooks to be used with helper methods.

import { useEffect, useState, useRef } from 'react';

// #region common find/update methods for object nested fields
const recursiveFind = (retFields, parent) => {
  // console.log(retFields);
  // console.log(parent);
  const recu = (fieldList, obj, i) => {
    const key = fieldList[i];
    // Base case: return the value
    if (i === fieldList.length - 1) {
      
        return obj?.[key];
    }

    // Continue traversing if the key exists
    return recu(fieldList, obj?.[key], i+1);
  }

  const ret = [];
  retFields.forEach((field) => {
    
    const fieldList = (field
      .replace(/\[/g, '.') 
      .replace(/\]/g, '.')
      .replace(/\s+/g, '')
      .replace(/\.{2,}/g, '.') 
      .replace(/^[.\[\]]+|[.\[\]]+$/g, '')
    ).split('.');
    ret.push(recu(fieldList, parent, 0));
  })
  return ret;
};

const recursiveUpdate = (updates, parent) => {
  
  const recu = (fieldList, newVal, obj, i) => {
    const key = fieldList[i];
    
    // base case, update the field
    if (i === fieldList.length - 1) {
        return key.startsWith('[') 
            ? obj.map((item, j) => (Number(key.slice(1)) === j ? newVal : item)) 
            : { ...obj, [key]: newVal };
    }
    // recursive case, go to the next subfield
    return key.startsWith('[') 
        ? obj.map((item, j) => (Number(key.slice(1)) === j ? recu(fieldList, newVal, item, i + 1) : item)) 
        : { ...obj, [key]: recu(fieldList, newVal, obj[key], i + 1) };
  }

  updates.forEach((update) => {
    const fieldList = (update[0]
      .replace(/\[/g, '.[') 
      .replace(/\]/g, '.')
      .replace(/\s+/g, '')
      .replace(/\.{2,}/g, '.') 
      .replace(/^[.\[\]]+|[.\[\]]+$/g, '')
    ).split('.');
    parent = recu(fieldList, update[1], parent, 0);
  })
  return parent;
  
};
// #endregion


// 1) state hook for a list of objects with nested fields. returns the state as well as setters/getters for nested fields.
export const useObjectList = (initial=[]) => {  
  
  const [list, setList] = useState(initial);

  const getValue = (match, retFields) => {
    const item = list.find((obj, index) => Number(match) === index || Object.values(obj).includes(match));
    if (!retFields) return item
    return (!item) ? undefined : recursiveFind(retFields, item); // Return undefined if no match is found
  }

  const setValue = (match, updates) => {
    setList((prev) => 
      prev?.map((item, index) => 
        (Number(match) === index || Object.values(item).includes(match)) ? recursiveUpdate(updates, item) : item
    ))
  }
  
  const pushItem = (newItem) => setList(prev => [...prev??[], newItem]);
  

  return [list, getValue, setValue, pushItem, setList];
}

// 2) state hook for an object of other objects with nested fields. returns the state as well as setters/getters for nested fields. 
export const useObjectMap = (initial={}) => {
  
    const [map, setMap] = useState(initial);
  
    const getValue = (match, retFields) => {
      const item = map?.[match];
      if (!retFields) return item
      return (!item) ? undefined : recursiveFind(retFields, item);
    }
  
    const setValue = (match, updates) => {
      

      setMap(prev => ({
        ...prev,
        [match]: (prev[match]) ? recursiveUpdate(updates, prev[match]) : updates,
      }));
    }
    
    const push = (code, obj) => {
      setMap(prev => ({
        ...prev,
        [code]: obj,
      }));
    }
  
    return [map, getValue, setValue, push, setMap];
}

// 3) reference hook for an object of other objects with nested fields. returns the state as well as setters/getters for nested fields. 
export const useObjectRef = (initial={}) => {
  
  const map = useRef(initial);

  const getValue = (match, retFields) => {
    const item = map?.current?.[match];
    
    if (!retFields) return item
    return (!item) ? undefined : recursiveFind(retFields, item); // Return undefined if no match is found
  
  }

  const initMap = (input) => {
    map.current = input ?? {}
  };
  const setValue = (match, updates) => {
    map.current[match] = recursiveUpdate(updates, map?.current?.[match]);
  }
  return [map, getValue, setValue, initMap];
}

// 4) effect hook that does not run on the first render, and only calls func() on subsequent dependency changes.
export const useMountedEffect = (func, deps) => {

  const mounted = useRef(false);
  
  useEffect(() => {
    if (mounted.current) func();
    else mounted.current = true;
  }, deps);

}

// 5) effect hook that does not run on the first render. it calls func1() on the first dependency change and func2() on subsequent changes.
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
