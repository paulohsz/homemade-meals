
import { styled } from '@mui/material/styles';
import { Modal } from '@mui/material';

const ModalBasic = styled(Modal)(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.modal,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export default ModalBasic;
