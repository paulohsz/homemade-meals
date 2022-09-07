import React from 'react';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
// import { useSnackbar } from 'notistack';
import websitePageHOC from 'src/components/wrappers/WebsitePage/hoc';
import { useSession } from 'next-auth/react';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useWebsitePage } from 'src/providers/WebsitePageContext';

const userSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  passwordCurrent: Yup.string()
    .min(6, 'Minimum an six-character password')
    .required('Current password is required'),
  password: Yup.string().min(6, 'Minimum an six-character password'),
  confirmPassword: Yup.string().when('password', {
    is: (val: string) => !!(val && val.length > 0),
    then: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  }),
});
type FormData = {
  name: string;
  passwordCurrent: string;
  password: string;
  confirmPassword: string;
};

function UpdatePassword() {
  // const { enqueueSnackbar } = useSnackbar();
  const { toggleLoading } = useWebsitePage();

  const {data: session} = useSession();

  const defaultValues = {
      name: session?.user?.name ?? '',
      passwordCurrent: '',
      password: '',
      confirmPassword: '',
  };

  const methods = useForm<FormData>({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const handleUpdate = async (data: FormData) => {
    console.log(data);
    toggleLoading();
    setTimeout(() => {
      toggleLoading(false);
    }, 2*1000);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     name: session?.user?.name ?? '',
  //     passwordCurrent: '',
  //     password: '',
  //     confirmPassword: '',
  //   },
  //   validationSchema: login,
  //   onSubmit: async (values) => {
  //     // remove empty fields
  //     const form = Object.keys(values)
  //       .reduce((acc, field) => (values[field] === '' ? acc : { ...acc, [field]: values[field] }), {});

  //     const errorMessage = () => {
  //       enqueueSnackbar('Something is wrong when update', { variant: 'error' });
  //     };

  //     toggleModalLoading(true);
  //     userUpdate(form, errorMessage)
  //       .then((res) => {
  //         if (res.data.success) {
  //           enqueueSnackbar('Updated user', { variant: 'success' });
  //         }
  //       })
  //       .finally(() => toggleModalLoading(false));
  //   },
  //   enableReinitialize: true,
  // });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" color="grey.800">
        Change your password
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleUpdate)}>
        <Grid sx={{ my: 3 }} spacing={3} container>
          <Grid xs={12} item>
            <RHFTextField name="name" label="Name" />
          </Grid>
          <Grid xs={4} item>
            <RHFTextField
              name="passwordCurrent"
              label="Current password"
              password
              fullWidth
            />
          </Grid>
          <Grid xs={4} item>
            <RHFTextField
              name="password"
              label="New password"
              password
            />
          </Grid>
          <Grid xs={4} item>
            <RHFTextField
              name="confirmPassword"
              label="Confirm new password"
              password
            />
          </Grid>
          <Grid sx={{ textAlign: 'right' }} xs={12} item>
            <Button type="submit">Update</Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default websitePageHOC(UpdatePassword, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Profile - Update password',
    },
    authenticator: {
      isRequired: true,
    },
  },
});
