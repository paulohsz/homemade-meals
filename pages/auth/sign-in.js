import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  Box,
  Collapse,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Lock, Login } from '@mui/icons-material';
import axios from 'axios';
import TextFieldHM from '../../src/components/forms/TextFieldHM';
import ButtonHM from '../../src/components/forms/ButtonHM';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';
import Wrapper from './components/Wrapper';

const login = Yup.object().shape({
  email: Yup.string().required('The email is a required field'),
  password: Yup.string().required('The password is a required field'),
});
const emailForgetValid = Yup.object().shape({
  emailForget: Yup.string().required('The email is a required field'),
});

function SignIn() {
  const defaultMessage = {
    show: false,
    error: false,
    text: '',
  };
  const defaultForget = { show: false, sent: false };

  const [session] = useSession();
  const { push, query: { forgot } } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isForget, setIsForget] = useState(defaultForget);
  const [message, setMessage] = useState(defaultMessage);

  const goForgot = () => {
    setMessage({ ...message, show: false });
    setIsForget({ ...isForget, show: true });
  };

  useEffect(() => {
    if (session) {
      push('/list/ingredients');
    }
  }, [session]);

  useEffect(() => {
    if (forgot === 'true') {
      goForgot();
    }
  }, [forgot]);

  const handleLogin = async (email, password) => {
    const status = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (status.error === null) {
      setMessage({
        show: true,
        error: false,
        text: 'Login Successful. Redirecting...',
      });
      push('/list/ingredients');
    } else {
      setIsLoading(false);
      setMessage({
        show: true,
        error: true,
        text: status.error,
      });
    }
  };

  const handleForget = async (emailForget) => {
    axios.post('/api/auth/forget-password/', { email: emailForget })
      .then(({ data }) => {
        setIsLoading(false);
        setIsForget({ ...isForget, sent: data.success });
        setMessage({
          show: true,
          error: !data.success,
          text: data.message,
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      emailForget: '',
    },
    validationSchema: isForget.show ? emailForgetValid : login,
    onSubmit: async ({ email, password, emailForget }) => {
      setMessage({ ...message, show: false });
      setIsLoading(true);
      if (isForget.show) {
        handleForget(emailForget);
      } else {
        handleLogin(email, password);
      }
    },
  });

  return (
    <Wrapper
      title={isForget.show ? 'Forgot Password' : 'Sign In'}
      top={(
        <Collapse in={message.show}>
          <Alert
            sx={{ mt: 2 }}
            severity={message.error ? 'error' : 'success'}
          >
            {message.text}
          </Alert>
        </Collapse>
      )}
    >
      <form id="form-signin" onSubmit={formik.handleSubmit}>
        <Collapse in={!isForget.show}>
          <Grid spacing={3} container>
            <Grid xs={12} item>
              <TextFieldHM
                label="E-mail"
                id="email"
                sx={{ mt: 1 }}
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
            <Grid
              xs={6}
              container
              alignContent="center"
              sx={{
                cursor: 'pointer',
                color: 'grey.600',
                fontSize: 14,
                '&:hover': {
                  color: 'grey.700',
                  textDecoration: 'underline',
                },
              }}
              onClick={() => goForgot()}
              item
            >
              Forgot Password?
            </Grid>
            <Grid xs={6} sx={{ textAlign: 'right' }} item>
              <LoadingButton
                component={ButtonHM}
                loading={isLoading}
                loadingPosition="start"
                startIcon={<Login />}
                type="submit"
                variant="contained"
              >
                Sign In
              </LoadingButton>
            </Grid>
          </Grid>
        </Collapse>
        <Collapse in={isForget.show && !isForget.sent}>
          <Grid spacing={3} container>
            <Grid xs={12} item>
              <TextFieldHM
                label="E-mail"
                id="emailForget"
                sx={{ mt: 1 }}
                placeholder="Your email"
                InputLabelProps={{ shrink: true }}
                formik={formik}
                fullWidth
              />
            </Grid>
            <Grid xs={4} item>
              <ButtonHM onClick={() => setIsForget(defaultForget)}>
                Cancel
              </ButtonHM>
            </Grid>
            <Grid xs={8} sx={{ textAlign: 'right' }} item>
              <LoadingButton
                component={ButtonHM}
                loading={isLoading}
                loadingPosition="start"
                startIcon={<Lock />}
                type="submit"
              >
                Reset Password
              </LoadingButton>
            </Grid>
          </Grid>
        </Collapse>
      </form>
      <Collapse in={isForget.show && isForget.sent}>
        <Box textAlign="center">
          <ButtonHM onClick={() => {
            setMessage({ ...message, show: false });
            setIsForget(defaultForget);
          }}
          >
            Sign In
          </ButtonHM>
        </Box>
      </Collapse>
    </Wrapper>
  );
}
export default websitePageHOC(SignIn, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Sign In',
    },
    authenticator: {
      isRequired: false,
    },
    menuProps: {
      display: false,
    },
  },
});
