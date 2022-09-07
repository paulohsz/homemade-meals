import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import * as Yup from 'yup';
import { Grid, Box, Collapse, Alert, Button } from '@mui/material';
import Login from '@mui/icons-material/Login';
import Lock from '@mui/icons-material/Lock';
import { LoadingButton } from '@mui/lab';
// import websitePageHOC from 'src/components/wrappers/WebsitePage/hoc';
import Wrapper from './components/Wrapper';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'src/components/hook-form/FormProvider';
import websitePageHOC from 'src/components/wrappers/WebsitePage/hoc';

// const emailForgetValid = Yup.object().shape({
//   emailForget: Yup.string().required('The email is a required field'),
// });

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const defaultValues = {
  email: 'paulostoc@gmail.com',
  password: 'admin',
};

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const defaultMessage = {
    show: false,
    error: false,
    text: '',
  };
  const defaultForget = { show: false, sent: false };

  const { status } = useSession();
  console.log('🚀 ~ file: sign-in.tsx ~ line 46 ~ SignIn ~ status', status);

  const {
    push,
    // query: { forgot },
  } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isForget, setIsForget] = useState(defaultForget);
  const [message, setMessage] = useState(defaultMessage);

  if (status === 'authenticated') {
    push('/');
  }

  const methods = useForm<FormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;



  // const goForgot = () => {
  //   setMessage({ ...message, show: false });
  //   setIsForget({ ...isForget, show: true });
  // };

  // useEffect(() => {
  //   if (forgot === 'true') {
  //     goForgot();
  //   }
  // }, [forgot]);

  const handleLogin = async ({ email, password }: FormData) => {
    setMessage({ ...message, show: false });
    setIsLoading(true);
    const statusSignIn = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (statusSignIn && statusSignIn.error === null) {
      setMessage({
        show: true,
        error: false,
        text: 'Login Successful. Redirecting...',
      });
    } else {
      setIsLoading(false);
      setMessage({
        show: true,
        error: true,
        text: (statusSignIn && statusSignIn.error) || '',
      });
    }
  };

  // const handleForget = async (emailForget) => {
  //   axios.post('/api/auth/forget-password/', { email: emailForget })
  //     .then(({ data }) => {
  //       setIsLoading(false);
  //       setIsForget({ ...isForget, sent: data.success });
  //       setMessage({
  //         show: true,
  //         error: !data.success,
  //         text: data.message,
  //       });
  //     });
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //     emailForget: '',
  //   },
  //   validationSchema: isForget.show ? emailForgetValid : login,
  //   onSubmit: async ({ email, password, emailForget }) => {
  //     setMessage({ ...message, show: false });
  //     setIsLoading(true);
  //     if (isForget.show) {
  //       handleForget(emailForget);
  //     } else {
  //       handleLogin(email, password);
  //     }
  //   },
  // });

  return (
    <Wrapper
      title={isForget.show ? 'Forgot Password' : 'Sign In'}
      top={
        <Collapse in={message.show}>
          <Alert sx={{ mt: 2 }} severity={message.error ? 'error' : 'success'}>
            {message.text}
          </Alert>
        </Collapse>
      }
    >
      {/* <form id="form-signin"> */}

      <FormProvider methods={methods} onSubmit={handleSubmit(handleLogin)}>
        <Collapse in={!isForget.show}>
          <Grid spacing={3} container>
            <Grid xs={12} item>
              <RHFTextField
                label="E-mail"
                name="email"
                sx={{ mt: 1 }}
                placeholder="example@email.com"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid xs={12} item>
              <RHFTextField
                label="Password"
                name="password"
                placeholder="******"
                InputLabelProps={{ shrink: true }}
                password
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
              // onClick={() => goForgot()}
              item
            >
              Forgot Password?
            </Grid>
            <Grid xs={6} sx={{ textAlign: 'right' }} item>
              <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                startIcon={<Login />}
                type="submit"
              >
                Sign In
              </LoadingButton>
            </Grid>
          </Grid>
        </Collapse>
        <Collapse in={isForget.show && !isForget.sent}>
          <Grid spacing={3} container>
            <Grid xs={12} item>
              <RHFTextField
                label="E-mail"
                name="emailForget"
                sx={{ mt: 1 }}
                placeholder="Your email"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid xs={4} item>
              <Button onClick={() => setIsForget(defaultForget)}>Cancel</Button>
            </Grid>
            <Grid xs={8} sx={{ textAlign: 'right' }} item>
              <LoadingButton
                component={Button}
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
      </FormProvider>
      <Collapse in={isForget.show && isForget.sent}>
        <Box textAlign="center">
          <Button
            onClick={() => {
              setMessage({ ...message, show: false });
              setIsForget(defaultForget);
            }}
          >
            Sign In
          </Button>
        </Box>
      </Collapse>
    </Wrapper>
  );
};

// export default SignIn;
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
