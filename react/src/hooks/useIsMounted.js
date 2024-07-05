import React, { useRef, useEffect } from 'react';

// 解决 React state update on an unmounted component
function useIsMounted() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });
  return isMounted;
}

export default useIsMounted;
