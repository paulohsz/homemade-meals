import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import TextFieldHM from '../../components/forms/TextFieldHM';
import { useUsers } from '../../provider/UsersContext';
import { userCreate, userEdit } from '../../services/usersService';
import { useWebsitePage } from '../../provider/WebsitePageContext';

const userYup = Yup.object().shape({
  name: Yup.string().required(),
  password: Yup.string(),
  email: Yup.string().required(),
  observation: Yup.string(),
});

export default function UserForm({ usr, open, onClose }) {
  const { users, addUser, updateUser } = useUsers();
  const { toggleModalLoading } = useWebsitePage();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      _id: usr._id ?? '',
      name: usr.name ?? '',
      email: usr.email ?? '',
      password: '',
      observation: usr.observation ?? '',
    },
    validationSchema: userYup,
    onSubmit: ({ _id, ...values }) => {
      toggleModalLoading(true);
      if (_id === '') {
        const errorCreate = () => {
          enqueueSnackbar('Something is wrong when created user', { variant: 'error' });
        };

        userCreate(values, errorCreate)
          .then((res) => {
            if (res.status === 201) {
              enqueueSnackbar('User created!', { variant: 'success' });
              addUser(res.data);
              onClose();
            } else {
              enqueueSnackbar('Something is wrong when created user', { variant: 'error' });
            }
          })
          .finally(() => toggleModalLoading(false));
      } else {
        const errorEdit = () => {
          enqueueSnackbar('Something is wrong when update user', { variant: 'error' });
        };
        userEdit(_id, values, errorEdit)
          .then((res) => {
            if (res.status === 200) {
              enqueueSnackbar('User Update!', { variant: 'success' });
              updateUser(res.data);
              onClose();
            } else {
              enqueueSnackbar('Something is wrong when update user', { variant: 'error' });
            }
          })
          .finally(() => toggleModalLoading(false));
      }
    },
    validate: (values) => {
      const errors = {};
      if (values.email) {
        const findName = users.some(
          (user_) => values.email === user_.email && values._id !== user_._id,
        );
        if (findName) {
          errors.email = `The email "${values.email}" already exists!`;
        }
      }
      return errors;
    },
    enableReinitialize: true,
  });

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" PaperProps={{ sx: { borderRadius: 4 } }}>
        <DialogTitle>
          Create Users
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Text... Text...</DialogContentText> */}
          <form id="form-user" onSubmit={formik.handleSubmit}>
            <Grid spacing={2} sx={{ pt: 1 }} container>
              <Grid xs={12} item>
                <TextFieldHM label="Name" id="name" formik={formik} fullWidth />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextFieldHM label="Email" id="email" formik={formik} fullWidth />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextFieldHM
                  label="Password"
                  id="password"
                  formik={formik}
                  inputProps={{
                    autoComplete: 'new-password',
                  }}
                  password
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextFieldHM
                  label="Observation"
                  id="observation"
                  formik={formik}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button
            form="form-user"
            color="primary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* users.map((user_) => <div key={user_.name}>{user_.name}</div>) */}
    </>
  );
}
UserForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  usr: PropTypes.objectOf(PropTypes.any).isRequired,
};
