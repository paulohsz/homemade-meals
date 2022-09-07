import { Theme } from '@mui/material/styles';

const TextField = (theme: Theme) => {
  return {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  };
};

export default TextField;
