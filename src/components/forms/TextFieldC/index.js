import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles/';

const TextFieldC = styled(({ color, sx, ...props }) => {
  console.log('Component', props);
  const sxDef = { pb: 3, pt: 3 };
  return <Button {...props} sx={{ ...sxDef, ...sx }} />;
})(({ theme, ...props }) => {
  console.log('theme', theme);
  console.log('themePROPS', props);
  return {
    color: '#ba3',
  };
});

TextFieldC.defaultProps = {
  variant: 'contained',
};

export default TextFieldC;
