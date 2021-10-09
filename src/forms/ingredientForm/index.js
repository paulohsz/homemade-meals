import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  IconButton,
  Grid,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // DialogContentText,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import TextFieldHM from '../../components/forms/TextFieldHM';
import { useIngredients } from '../../provider/IngredientsContext';
import { ingredientCreate, ingredientEdit } from '../../services/ingredientsService';
import Loading from '../../components/commons/Loading';
import { baseUnit, types } from '../../utils/staticTables';

const ingredient = Yup.object().shape({
  name: Yup.string().required(),
  baseUnit: Yup.string().required(),
  type: Yup.string(),
  quantity: Yup.number().positive().required(),
  price: Yup.number().positive().required(),
  observation: Yup.string(),
});

export default function IngredientForm({ ingr, open, onClose }) {
  const { ingredients, addIngredient, updateIngredient } = useIngredients();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      _id: ingr._id ?? '',
      name: ingr.name ? ingr.name : '',
      baseUnit: ingr.baseUnit ?? '',
      type: ingr.type ?? '',
      quantity: ingr.quantity ?? '',
      price: ingr.price ?? '',
      observation: ingr.observation ?? '',
    },
    validationSchema: ingredient,
    onSubmit: ({ _id, ...values }) => {
      setIsLoading(true);
      if (_id === '') {
        const errorCreate = () => {
          enqueueSnackbar('Something is wrong when created ingredient', { variant: 'error' });
        };

        ingredientCreate(values, errorCreate)
          .then((res) => {
            if (res.status === 201) {
              enqueueSnackbar('Ingredient created!', { variant: 'success' });
              addIngredient(res.data);
              onClose();
            } else {
              enqueueSnackbar('Something is wrong when created ingredient', { variant: 'error' });
            }
          })
          .finally(() => setIsLoading(false));
      } else {
        const errorEdit = () => {
          enqueueSnackbar('Something is wrong when update ingredient', { variant: 'error' });
        };
        ingredientEdit(_id, values, errorEdit)
          .then((res) => {
            if (res.status === 200) {
              enqueueSnackbar('Ingredient Update!', { variant: 'success' });
              updateIngredient(res.data);
              onClose();
            } else {
              enqueueSnackbar('Something is wrong when update ingredient', { variant: 'error' });
            }
          })
          .finally(() => setIsLoading(false));
      }
    },
    validate: (values) => {
      const errors = {};
      if (values.name) {
        const findName = ingredients.some(
          (ingredient_) => values.name === ingredient_.name && values._id !== ingredient_._id,
        );
        if (findName) {
          errors.name = `The name "${values.name}" already exists!`;
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
          Create Ingredients
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
          <form id="form-ingredient" onSubmit={formik.handleSubmit}>
            <Grid spacing={2} sx={{ pt: 1 }} container>
              <Grid xs={12} md={6} item>
                <TextFieldHM label="Name" id="name" formik={formik} fullWidth />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextFieldHM
                  label="Type"
                  id="type"
                  formik={formik}
                  select
                  fullWidth
                >
                  {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextFieldHM>
              </Grid>
              <Grid xs={12} md={6} item>
                <TextFieldHM
                  label="Quantity"
                  id="quantity"
                  formik={formik}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextFieldHM
                  label="Base Unit"
                  id="baseUnit"
                  formik={formik}
                  select
                  fullWidth
                >
                  {baseUnit.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextFieldHM>
              </Grid>
              <Grid xs={12} md={6} item>
                <TextFieldHM
                  label="Price"
                  id="price"
                  formik={formik}
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
            form="form-ingredient"
            color="primary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Loading open={isLoading} />
      {/* ingredients.map((ingredient_) => <div key={ingredient_.name}>{ingredient_.name}</div>) */}
    </>
  );
}
IngredientForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ingr: PropTypes.objectOf(PropTypes.any).isRequired,
};
