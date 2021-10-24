import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Fade, LinearProgress } from '@mui/material';

const ProgressLinear = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let isMount = true;
    router.events.on('routeChangeStart', () => { if (isMount) setShow(true); });
    router.events.on('routeChangeComplete', () => { if (isMount) setShow(false); });
    router.events.on('routeChangeError', () => { if (isMount) setShow(false); });

    return () => {
      isMount = false;
      router.events.off('routeChangeStart', () => { setShow(true); });
      router.events.off('routeChangeComplete', () => { setShow(false); });
      router.events.off('routeChangeError', () => { setShow(false); });
    };
  }, [router.events]);

  return (
    <Fade in={show}>
      <LinearProgress
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          height: '3px',
        }}
      />
    </Fade>
  );
};

export default ProgressLinear;
