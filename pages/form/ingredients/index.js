import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from '../../../src/components/foundation/layout/Grid';
import Text from '../../../src/components/foundation/Text';
import TextField from '../../../src/components/forms/TextField';
import TextArea from '../../../src/components/forms/TextArea';

const ingredient = Yup.object().shape({
  name: Yup
    .string()
    // .number()
    // .min(52, 'Too Short!')
    // .max(50, 'Too Long!')
    // .required('Required'),
    .required(),
  baseUnit: Yup
    .string()
    .required(),
  type: Yup
    .string(),
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
      alert(JSON.stringify(data, null, 2));
      return data;
    },
    validate: (values) => {
      const errors = {};
      if (values.name) {
        const fruits = ['apple', 'ban ana', 'mango', 'guava'];
        const findName = fruits.some((fruit) => values.name === fruit);
        if (findName) {
          // for demo purpose, the if check will always return error
          errors.name = `The name "${values.name}" already exists !`;
        }
      }
      return errors;
    },
  });

  // marginTop={{ xs: '32px', md: '75px' }}
  return (
    <>
      <Grid.Container
        display="flex"
        flexGrow={1}
        alignItems="stretch"
        justifyContent="center"
        flexDirection="column"
      >
        <Grid.Row>
          <Grid.Col>
            <Text tag="h1" variant="title">Create Ingredients</Text>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col
            offset={0}
            value={12}
          >

            <form onSubmit={formik.handleSubmit}>
              <TextField
                placeholder="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                placeholder="Type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              />
              <TextField
                placeholder="Quantity"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
              <TextField
                placeholder="Base Unit"
                name="baseUnit"
                value={formik.values.baseUnit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.baseUnit && Boolean(formik.errors.baseUnit)}
                helperText={formik.touched.baseUnit && formik.errors.baseUnit}
              />
              <TextField
                placeholder="Value"
                name="value"
                value={formik.values.value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.value && Boolean(formik.errors.value)}
                helperText={formik.touched.value && formik.errors.value}
              />
              <TextArea
                placeholder="Observation"
                name="observation"
                value={formik.values.observation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.observation && Boolean(formik.errors.observation)}
                helperText={formik.touched.observation && formik.errors.observation}
              />
              <button color="primary" variant="contained" type="submit">
                Submit
              </button>
            </form>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
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
