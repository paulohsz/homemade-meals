import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import Grid from '../../../src/components/foundation/layout/Grid';
// import Text from '../../../src/components/foundation/Text';
import {
  Box, Button, Container, Grid, MenuItem, Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HMTextField from '../../../src/components/forms/HMTextField';
import { useIngredients } from '../../../src/provider/IngredientsContext';
// import TextArea from '../../../src/components/forms/TextArea';

const ingredient = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  baseUnit: Yup
    .string()
    .required(),
  type: Yup
    .string()
    .required(),
  quantity: Yup
    .number()
    .positive()
    .required(),
  value: Yup
    .number()
    .positive()
    .required(),
  observation: Yup
    .string(),
});

export default function Ingredients() {
  const { ingredients } = useIngredients();
  const formik = useFormik({
    initialValues: {
      name: '',
      baseUnit: '',
      type: '',
      quantity: '',
      value: '',
      observation: '',
    },
    validationSchema: ingredient,
    onSubmit: async (values) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      };
      const data = await fetch('/api/ingredients/', requestOptions)
        .then((res) => res.json())
        .then((res) => res);
      console.log(JSON.stringify(data, null, 2));
      return data;
    },
    validate: (values) => {
      const errors = {};
      if (values.name) {
        const findName = ingredients.some((ingredient_) => values.name === ingredient_.name);
        if (findName) {
          errors.name = `The name "${values.name}" already exists!`;
        }
      }
      return errors;
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container maxWidth="md">
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            Create Ingredients
          </Typography>
          <Box sx={{ textAlign: 'end', p: 2 }}>
            <Button onClick={() => setOpen(true)}> Create </Button>
          </Box>
          <Grid spacing={2} container>
            <Grid xs={12} md={6} item>
              <HMTextField
                label="Name"
                id="name"
                formik={formik}
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <HMTextField
                label="Type"
                id="type"
                formik={formik}
                select
                fullWidth
              >
                {[
                  { value: 'duzia', label: 'Dúzia (dz)' },
                  { value: 'gramas', label: 'Gramas (gr)' },
                  { value: 'litros', label: 'Litro (L)' },
                  { value: 'mililitros', label: 'Mililitros (ml)' },
                  { value: 'unidade', label: 'Unidade (Un)' },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </HMTextField>
            </Grid>
            <Grid xs={12} md={6} item>
              <HMTextField
                label="Quantity"
                id="quantity"
                formik={formik}
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <HMTextField
                label="Base Unit"
                id="baseUnit"
                formik={formik}
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <HMTextField
                label="Value"
                id="value"
                formik={formik}
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <HMTextField
                label="Observation"
                id="observation"
                formik={formik}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <Button color="primary" variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        {ingredients.map((ingredient_) => {
          console.log(ingredient_);
          return (
            <div key={ingredient_.name}>
              {ingredient_.name}
            </div>
          );
        })}
        <pre>
          {JSON.stringify(formik, null, 2)}
        </pre>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// <pre>{JSON.stringify(formik, null, 2)}</pre>

// <Box>
//        <Text>Create Ingredients</Text>
//      </Box>

/* if (values.username) {
  console.log("inside");
  return fetch("https://reqres.in/api/users/2")
    .then(res => res.json())
    .then(res => {
      const errors = {};
      console.log("email", res.data.email);
      if (res.data.email === "janet.weaver@reqres.in") {
        console.log("email", "inside");
        //for demo purpose, the if check will always return error
        errors.username = "server error -user already exists !";
        return errors;
      }
    });
} */
