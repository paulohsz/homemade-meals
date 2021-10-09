import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  ModalUnstyled,
  Slide,
  Container,
} from '@mui/material';

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;
  backdrop-filter: blur(3px);
`;

const ModalBasic = styled(ModalUnstyled)(({ theme }) => ({
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

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const ModalBase = ({
  open, onClose, maxWidth, containerSX, children,
}) => (
  <ModalBasic open={open} onClose={onClose} BackdropComponent={Backdrop}>
    <Transition in={open} mountOnEnter unmountOnExit>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          bgcolor: 'background.paper',
          boxShadow: 6,
          borderRadius: 4,
          p: 2,
          m: 3,
          outline: 'none',
          backgroundImage: 'radial-gradient(circle at 100% 100%, rgba(204,0,0,0) 14px, transparent 15px)',
          ...containerSX,
        }}
        maxWidth={maxWidth}
      >
        {children}
      </Container>
    </Transition>
  </ModalBasic>
);

ModalBase.defaultProps = {
  maxWidth: 'xs',
  onClose: () => {},
  containerSX: {},
};

ModalBase.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  containerSX: PropTypes.objectOf(PropTypes.any),
  maxWidth: PropTypes.string,
};

export default ModalBase;
