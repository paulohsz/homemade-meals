import { Box, Container, Divider, Grid, Paper, SvgIcon } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'src/components/svg/Logo';

type WrapperProps = {
  top: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
}

const Wrapper = ({ title, top, children }: WrapperProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
    >
      <Container maxWidth="xs">
        <Paper elevation={5} sx={{ p: 2, my: 2, borderRadius: 4 }}>
          <Grid spacing={3} container>
            <Grid xs={12} sx={{ textAlign: 'center' }} item>
              <SvgIcon sx={{ fontSize: 65 }} color="primary">
                <Logo />
              </SvgIcon>
              <Divider sx={{ mt: 1 }}>
                <Box
                  sx={{ fontWeight: 500, fontSize: 18, color: 'grey.A700' }}
                >
                  {title}
                </Box>
              </Divider>
              {top}
            </Grid>
            <Grid xs={12} item>
              {children}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

Wrapper.defaultProps = {
  top: <></>,
};

Wrapper.propTypes = {
  top: PropTypes.node,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default Wrapper;