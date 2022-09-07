import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Fade, LinearProgress } from '@mui/material';

const ProgressLinear = () => {
  const [isChanging, setIsChanging] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsChanging(true);
    };
    const handleStop = () => {
      setIsChanging(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <Fade in={isChanging}>
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
