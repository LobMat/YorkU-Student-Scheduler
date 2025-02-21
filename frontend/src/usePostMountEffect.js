import React, { useEffect, useRef } from 'react';

const usePostMountEffect = (callback, dependencies) => {
    const mounted = useRef(false);

    useEffect(() => {
        if (mounted.current) callback();
        else mounted.current = true;
    }, dependencies);
}

export default usePostMountEffect;
