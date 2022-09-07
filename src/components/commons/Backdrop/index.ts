import { styled } from '@mui/material/styles';
import cssStyles from 'src/utils/cssStyles';

const Backdrop = styled('div')(({theme}) => ({
    zIndex: -1,
    position: 'fixed',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    ...cssStyles().bgBlur({ blur: 3, opacity: 0.2, color: theme.palette.background.default }),
}));

export default Backdrop;
