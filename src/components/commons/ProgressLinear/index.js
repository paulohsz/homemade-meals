import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Fade, LinearProgress } from '@mui/material';

const ProgressLinear = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => { setShow(true); });
    router.events.on('routeChangeComplete', () => { setShow(false); });
    router.events.on('routeChangeError', () => { setShow(false); });

    return () => {
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
