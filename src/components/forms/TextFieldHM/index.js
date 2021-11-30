/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, IconButton, InputAdornment, Collapse,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function TextFieldHM({
  id,
  label,
  formik,
  variant,
  password,
  select,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false); // Hide or show password

  const [showError, setShowError] = useState({
    flag: false,
    text: '',
  });

  useEffect(() => {
    let isMount = true;
    if (formik?.touched[id] && Boolean(formik?.errors[id])) {
      if (isMount) {
        setShowError({
          flag: true,
          text: formik?.errors[id],
        });
      }
    } else if (isMount && showError.flag === true) {
      setTimeout(() => setShowError({
        flag: false,
        text: '',
      }),
      150);
    }
    return () => {
      isMount = false;
    };
  }, [formik?.touched[id], formik?.errors[id], formik?.submitCount]);

  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      // if the formik was passed as a parameter add basic formik parameters
      {...(formik && !select && {
        InputLabelProps: { shrink: !!formik.values[id] || formik.values[id] === 0 },
        value: formik.values[id],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: showError.flag,
        helperText: <Collapse in={formik.touched[id] && Boolean(formik.errors[id])}>{showError.text}</Collapse>,
        FormHelperTextProps: { component: 'div' },
      })}
      {...(formik && select && {
        value: formik.values[id],
        onChange: (e) => formik.setFieldValue(id, e.target.value),
        onBlur: () => formik.setTouched({ ...formik.touched, [id]: true }),
        error: showError.flag,
        helperText: <Collapse in={formik.touched[id] && Boolean(formik.errors[id])}>{showError.text}</Collapse>,
        FormHelperTextProps: { component: 'div' },
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
                aria-label="Show or hide the field"
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

TextFieldHM.defaultProps = {
  variant: 'outlined',
  formik: null,
  password: false,
  select: false,
};

TextFieldHM.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  formik: PropTypes.oneOfType([PropTypes.object]),
  password: PropTypes.bool,
  select: PropTypes.bool,
};

export default TextFieldHM;
