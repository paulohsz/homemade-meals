import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useWebsitePage } from '../../../provider/WebsitePageContext';

export default function Loading() {
  const { isModalLoading } = useWebsitePage();

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={isModalLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
