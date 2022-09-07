import { useRef, useEffect } from 'react';

// ----------------------------------------------------------------------
/**
  const isMountedRef = useIsMountedRef();
    if (isMountedRef.current) {
      function();
    }
 */

export default function useIsMountedRef() {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  return isMounted;
}
