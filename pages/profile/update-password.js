import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import TextFieldHM from '../../src/components/forms/TextFieldHM';
import ButtonHM from '../../src/components/forms/ButtonHM';
import { userUpdate } from '../../src/services/user';
import Loading from '../../src/components/commons/Loading';

const login = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  passwordCurrent: Yup.string()
    .min(6, 'Minimum an six-character password')
    .required('Current password is required'),
  password: Yup.string().min(6, 'Minimum an six-character password'),
  confirmPassword: Yup.string().when('password', {
    is: (val) => !!(val && val.length > 0),
    then: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  }),
});

export default function SignIn() {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [session, loading] = useSession();

  useEffect(() => {
    if (!session && !loading) {
      push('/');
    }
  }, [session]);

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: session?.user?.name ?? '',
      passwordCurrent: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: login,
    onSubmit: async (values) => {
      // remove empty fields
      const form = Object.keys(values)
        .reduce((acc, field) => (values[field] === '' ? acc : { ...acc, [field]: values[field] }), {});

      const errorMessage = () => {
        enqueueSnackbar('Something is wrong when update', { variant: 'error' });
      };

      setIsLoading(true);
      userUpdate(form, errorMessage)
        .then((res) => {
          if (res.data.success) {
            enqueueSnackbar('Updated user', { variant: 'success' });
          }
        })
        .finally(() => setIsLoading(false));
    },
    enableReinitialize: true,
  });

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" color="grey.800">
          Change your password
        </Typography>
        <form id="form-update-password" onSubmit={formik.handleSubmit}>
          <Grid sx={{ my: 3 }} spacing={3} container>
            <Grid xs={12} item>
              <TextFieldHM id="name" label="Name" formik={formik} fullWidth />
            </Grid>
            <Grid xs={4} item>
              <TextFieldHM
                id="passwordCurrent"
                label="Current password"
                formik={formik}
                password
                fullWidth
              />
            </Grid>
            <Grid xs={4} item>
              <TextFieldHM
                id="password"
                label="New password"
                formik={formik}
                password
                fullWidth
              />
            </Grid>
            <Grid xs={4} item>
              <TextFieldHM
                id="confirmPassword"
                label="Confirm new password"
                formik={formik}
                password
                fullWidth
              />
            </Grid>
            <Grid sx={{ textAlign: 'right' }} xs={12} item>
              <ButtonHM type="submit">Update</ButtonHM>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Loading open={isLoading} />
    </>
  );
}
