import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  Box,
  Collapse,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Lock } from '@mui/icons-material';
import axios from 'axios';
import TextFieldHM from '../../../../src/components/forms/TextFieldHM';
import ButtonHM from '../../../../src/components/forms/ButtonHM';
import Link from '../../../../src/Link';
import websitePageHOC from '../../../../src/components/wrappers/WebsitePage/hoc';
import Wrapper from '../../components/Wrapper';

const passwords = Yup.object({
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function SignIn() {
  const defaultMessage = {
    show: false,
    error: false,
    text: '',
  };

  const [session] = useSession();
  const { push, query: { token, email } } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isExp, setIsExp] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(defaultMessage);

  useEffect(() => {
    if (session) {
      push('/');
    }
  }, [session]);

  useEffect(() => {
    if (email && token) {
      axios.post('/api/auth/forget-password/create-password/', { email, token })
        .catch((error) => {
          if (error?.response?.data?.success === false) {
            setIsExp(true);
            setMessage({
              show: true,
              error: true,
              text: error?.response?.data?.message,
            });
          }
        });
    }
  }, [email, token]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      emailForget: '',
    },
    validationSchema: passwords,
    onSubmit: async ({ password, passwordConfirmation }) => {
      setMessage({ ...message, show: false });
      setIsLoading(true);
      axios.post('/api/auth/forget-password/create-password/', {
        email, token, password, passwordConfirmation,
      })
        .then(({ data }) => {
          setMessage({
            show: true,
            error: !data.success,
            text: data.message,
          });
          if (data.success) {
            setIsSuccess(true);
            signIn('credentials', {
              redirect: false,
              email,
              password,
            });
          }
        })
        .catch((error) => {
          setMessage({
            show: true,
            error: true,
            text: error?.response?.data?.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <Wrapper
      title="Reset Password"
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
        <Collapse in={!isExp && !isSuccess}>
          <Grid spacing={3} container>
            <Grid xs={12} item>
              <TextFieldHM
                label="Password"
                id="password"
                sx={{ mt: 1 }}
                placeholder="New password"
                InputLabelProps={{ shrink: true }}
                formik={formik}
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <TextFieldHM
                label="Confirm Password"
                id="passwordConfirmation"
                sx={{ mt: 1 }}
                placeholder="Confirm password"
                InputLabelProps={{ shrink: true }}
                formik={formik}
                fullWidth
              />
            </Grid>
            <Grid xs={4} item>
              <ButtonHM variant="contained" component={Link} noLinkStyle href="/auth/sign-in/">
                Sign In
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

      <Collapse in={isSuccess}>
        <Box textAlign="center">
          <ButtonHM variant="contained" component={Link} noLinkStyle href="/auth/sign-in/">
            Sign In
          </ButtonHM>
        </Box>
      </Collapse>

      <Collapse in={isExp}>
        <Box textAlign="center">
          <ButtonHM variant="contained" onClick={() => push({ pathname: '/auth/sign-in/', query: { forgot: true } })}>
            Forgot Password
          </ButtonHM>
        </Box>
      </Collapse>

    </Wrapper>
  );
}
export default websitePageHOC(SignIn, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Create a new Password',
    },
    authenticator: {
      isRequired: false,
    },
    menuProps: {
      display: false,
    },
  },
});
