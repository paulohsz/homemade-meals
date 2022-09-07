import { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ----------------------------------------------------------------------
RHFTextField.defaultProps = {
  password: false,
  InputProps: {},
};

RHFTextField.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.bool,
};

interface RHFTextFieldProps {
  name: string;
  password?: boolean;
}

export default function RHFTextField({
  name,
  password,
  InputProps,
  ...other
}: // }: InferProps<TextFieldProps & typeof RHFTextField.propTypes>) {
InferProps<TextFieldProps & RHFTextFieldProps>) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const InputPropsPassword = password
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              sx={{ mr: -0.5 }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }
    : {};

  const InputPropsNew = { ...InputPropsPassword, ...InputProps };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={
            typeof field.value === 'number' && field.value === 0
              ? ''
              : field.value
          }
          error={!!error}
          helperText={error?.message}
          InputProps={InputPropsNew}
          {...(password && {
            type: showPassword ? 'text' : 'password',
          })}
          {...other}
        />
      )}
    />
  );
}
