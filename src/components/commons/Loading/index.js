import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

export default function Loading({ open, onClose }) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={open}
      onClick={onClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
Loading.defaultProps = {
  onClose: () => {},
};
Loading.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};
