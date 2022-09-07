import { Theme } from '@mui/material/styles';

const Button = (theme: Theme) => {
  return {
    MuiButtonBase: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  };
};

export default Button;
