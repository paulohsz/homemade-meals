import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useWebsitePage } from '../../../providers/WebsitePageContext';

export default function Loading() {
  const { isLoading } = useWebsitePage();

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
