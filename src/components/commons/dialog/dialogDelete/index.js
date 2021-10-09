import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import ModalBase from '../modalBase';

const DialogDelete = ({
  open, onClose, onDelete, maxWidth, title, subtitle,
}) => (
  <ModalBase
    containerSX={{
      borderTop: ({ palette }) => `6px ${palette.error.main} solid`,
    }}
    circularProgressSX={{ color: 'error' }}
    maxWidth={maxWidth}
    open={open}
    onClose={onClose}
  >
    <Avatar
      sx={{
        bgcolor: ({ palette }) => palette.error.main,
        width: 60,
        height: 60,
        marginTop: '-50px',
        mb: 2,
        mx: 'auto',
      }}
    >
      <Delete sx={{ fontSize: 45 }} />
    </Avatar>
    <Typography variant="h5" component="div" gutterBottom>
      {title}
    </Typography>
    <Typography variant="subtitle1" component="div" color="grey.A700" gutterBottom>
      {subtitle}
    </Typography>
    <Box textAlign="end" mt={2}>
      <Button
        onClick={() => onClose()}
        sx={{
          '&:hover': { bgcolor: ({ palette }) => palette.grey[300] },
        }}
        variant="contained"
        color="inherit"
      >
        Close
      </Button>
      <Button
        onClick={() => onDelete()}
        sx={{ ml: 2 }}
        variant="contained"
        color="error"
      >
        Delete
      </Button>
    </Box>
  </ModalBase>
);

DialogDelete.defaultProps = {
  maxWidth: 'xs',
  onClose: () => {},
  onDelete: () => {},
  title: 'Confirm delete',
  subtitle: 'Are you sure want to delete this item?',
};

DialogDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  maxWidth: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default DialogDelete;
