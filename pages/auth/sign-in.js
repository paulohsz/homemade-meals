import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Grid, Container, Box, Paper, SvgIcon, Divider, Collapse, Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Login } from '@mui/icons-material';
import TextFieldHM from '../../src/components/forms/TextFieldHM';
import ButtonHM from '../../src/components/forms/ButtonHM';
import Logo from '../../src/components/svg/Logo';

const login = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

export default function SignIn() {
  const defaultMessage = {
    error: false,
    text: '',
  };

  const [session] = useSession();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  useEffect(() => {
    if (session) {
      push('/list/ingredients');
    }
  }, [session]);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: login,
    onSubmit: async ({ email, password }) => {
      setMessage(defaultMessage);
      setIsLoading(true);
      const status = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (status.error === null) {
        setMessage({
          error: false,
          text: 'Login Successful. Redirecting...',
        });
        push('/list/ingredients');
      } else {
        setIsLoading(false);
        setMessage({
          error: true,
          text: status.error,
        });
      }
    },
  });

  function getWindowDimensions() {
    const hasWindow = typeof window !== 'undefined';
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    const hasWindow = typeof window !== 'undefined';
    if (hasWindow) {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height={windowDimensions.height < (message.error ? 465 : 391) ? 'auto' : '100vh'}
    >
      <Container maxWidth="xs">
        <Paper elevation={5} sx={{ p: 2, my: 2, borderRadius: 4 }}>
          <form id="form-signin" onSubmit={formik.handleSubmit}>
            <Grid spacing={3} container>
              <Grid xs={12} sx={{ textAlign: 'center' }} item>
                <SvgIcon sx={{ fontSize: 65 }} color="primary">
                  <Logo />
                </SvgIcon>
                <Divider sx={{ mt: 1 }}>
                  <Box sx={{ fontWeight: 500, fontSize: 18, color: 'grey.A700' }}>
                    Sign In
                  </Box>
                </Divider>
                <Collapse in={!!message.text}>
                  <Alert sx={{ mt: 2 }} severity={message.error ? 'error' : 'success'}>{message.text}</Alert>
                </Collapse>
              </Grid>
              <Grid xs={12} item>
                <TextFieldHM
                  label="E-mail"
                  id="email"
                  placeholder="example@email.com"
                  InputLabelProps={{ shrink: true }}
                  formik={formik}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextFieldHM
                  label="Password"
                  id="password"
                  placeholder="******"
                  InputLabelProps={{ shrink: true }}
                  formik={formik}
                  password
                  fullWidth
                />
              </Grid>
              <Grid xs={12} sx={{ textAlign: 'right' }} item>
                <LoadingButton
                  component={ButtonHM}
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={<Login />}
                  type="submit"
                >
                  Sign In
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
