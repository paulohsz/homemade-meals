/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
// import IpsHelper from "../../../global/IpsHelper";

function HMTextField({
  id,
  label,
  formik,
  variant,
  password,
  select,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false); // Hide or show password

  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      // if the formik was passed as a parameter add basic formik parameters
      {...(formik && !select && {
        InputLabelProps: { shrink: !!formik.values[id] },
        value: formik.values[id],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: formik.touched[id] && Boolean(formik.errors[id]),
        helperText: formik.touched[id] && formik.errors[id],
      })}
      {...(formik && select && {
        value: formik.values[id],
        onChange: (e) => formik.setFieldValue(id, e.target.value),
        onBlur: () => formik.setTouched({ ...formik.touched, [id]: true }),
        error: formik.touched[id] && Boolean(formik.errors[id]),
        helperText: formik.touched[id] && formik.errors[id],
      })}
      // if the password parameter is passed, add icons to hide / show the text
      {...(password && {
        type: showPassword ? 'text' : 'password',
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        },
      })}
      {...({ ...props, select })}
    />
  );
}

HMTextField.defaultProps = {
  variant: 'outlined',
  formik: null,
  password: false,
  select: false,
};

HMTextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  formik: PropTypes.oneOfType([PropTypes.object]),
  password: PropTypes.bool,
  select: PropTypes.bool,
};

export default HMTextField;
