import React from 'react';
import { CircularProgress, Theme } from '@mui/material';
import Backdrop from '../Backdrop';
import { useWebsitePage } from 'src/providers/WebsitePageContext';
import ModalBasic from 'src/components/dialog/components/ModalBasic';

const Loading = () => {
  const { isLoading } = useWebsitePage();

  return (
    <ModalBasic
      open={isLoading}
      sx={{ color: '#fff', zIndex: (theme: Theme) => theme.zIndex.modal + 1 }}
      components={{Backdrop}}
    >
      <CircularProgress
        sx={{
          outline: 'none',
        }}
        size={60}
      />
    </ModalBasic>
  );
};

export default Loading;
