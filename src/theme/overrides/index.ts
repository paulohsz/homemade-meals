import { Theme } from '@mui/material/styles';
//
import Button from './Button';
import TextField from './TextField';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Button(theme),
    TextField(theme)
  );
}
