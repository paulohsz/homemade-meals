import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useIngredients } from '../../../src/provider/IngredientsContext';
import TextFieldHM from '../../../src/components/forms/TextFieldHM';
import IngredientForm from '../../../src/forms/ingredientForm';
import { ingredientDelete } from '../../../src/services/ingredientsService';
import DialogDelete from '../../../src/components/commons/dialog/dialogDelete';
import websitePageHOC from '../../../src/components/wrappers/WebsitePage/hoc';
import { useWebsitePage } from '../../../src/provider/WebsitePageContext';

// eslint-disable-next-line arrow-body-style
const GridRow = styled(Grid)(({ theme }) => {
  return {
    borderRadius: theme.shape.borderRadius * 2,
    alignItems: 'center',
    padding: [theme.spacing(1), theme.spacing(2)].join(' '),
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}20`,
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeIn,
      }),
    },
  };
});

const Button2 = styled(Button)(() => ({}));
Button2.defaultProps = {
  variant: 'outlined',
};

function Ingredients() {
  const { ingredients, deleteIngredient, loadingIngr } = useIngredients();
  const { toggleModalLoading } = useWebsitePage();
  const [ingr, setIngr] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [ingrForm, setIngrForm] = useState({});

  const [openX, setOpenX] = useState(false);
  const [modalDelete, setModalDelete] = useState({
    values: null,
  });

  const funcSearch = (string) => {
    setIngr(
      ingredients.map((item) => (item.search.indexOf(string.toLowerCase()) > -1
        ? { ...item, filter: true }
        : { ...item, filter: false })),
    );
  };

  useEffect(() => {
    funcSearch(search);
  }, [ingredients]);

  const onConfirmDelete = (id) => {
    setOpenX(true);
    setModalDelete({ ...modalDelete, values: id });
  };
  const onDelete = (id) => {
    setOpenX(false);
    toggleModalLoading(true);
    ingredientDelete(id)
      .then((res) => {
        if (res.status === 200) {
          setModalDelete({ values: null });
          deleteIngredient(id);
        }
      })
      .finally(() => {
        toggleModalLoading(false);
      });
  };
  const onClose = () => {
    setOpenX(false);
    toggleModalLoading(false);
    setModalDelete({ values: null });
  };

  const handleCloseForm = () => {
    setOpen(false);
    setTimeout(() => setIngrForm({}), 200);
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Ingredients
        </Typography>
        <Box sx={{ textAlign: 'end' }}>
          <Button2 onClick={() => setOpen(true)}>Create</Button2>
        </Box>
        <Box my={3} mx={5}>
          <TextFieldHM
            id="search"
            label="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              funcSearch(e.target.value);
            }}
            margin="none"
            size="small"
            fullWidth
          />
        </Box>
        <Grid sx={{ fontWeight: 500, px: 2, pb: 1 }} container>
          <Box
            component={Grid}
            xs={4}
            sm={3}
            item
          >
            Name
          </Box>
          <Box
            component={Grid}
            xs={3}
            sm={2}
            item
          >
            Quantity
          </Box>
          <Box
            component={Grid}
            xs={2}
            display={{ xs: 'none', sm: 'block' }}
            item
          >
            Type
          </Box>
          <Box
            component={Grid}
            xs={2}
            display={{ xs: 'none', sm: 'block' }}
            item
          >
            BaseUnit
          </Box>
          <Box
            component={Grid}
            xs={3}
            sm={1}
            item
          >
            Price
          </Box>
          <Box
            component={Grid}
            xs={2}
            style={{ textAlign: 'center' }}
            item
          >
            Actions
          </Box>
        </Grid>
        <Collapse in={loadingIngr}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              my: 4,
            }}
          >
            <CircularProgress sx={{ mr: 2 }} />
            Loading...
          </Box>
        </Collapse>
        <Collapse in={!loadingIngr && ingredients.length === 0}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              my: 4,
            }}
          >
            No data on DB!
          </Box>
        </Collapse>
        {ingr.map((ingredient) => (
          <Collapse
            key={ingredient._id}
            in={ingredient.delete === undefined && ingredient.filter}
          >
            <GridRow container>
              <Box
                component={Grid}
                xs={4}
                sm={3}
                item
              >
                {ingredient.name}
              </Box>
              <Box
                component={Grid}
                xs={3}
                sm={2}
                item
              >
                {ingredient.quantity}
              </Box>
              <Box
                component={Grid}
                xs={2}
                item
                display={{ xs: 'none', sm: 'block' }}
              >
                {ingredient.type}
              </Box>
              <Box
                component={Grid}
                xs={2}
                display={{ xs: 'none', sm: 'block' }}
                item
              >
                {ingredient.baseUnit}
              </Box>
              <Box
                component={Grid}
                xs={3}
                sm={1}
                item
              >
                {`€ ${ingredient.price}`}
              </Box>
              <Box
                component={Grid}
                xs={2}
                item
              >
                <Box display="flex" justifyContent="space-evenly">
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setOpen(true);
                      setIngrForm(ingredient);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => onConfirmDelete(ingredient._id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </GridRow>
          </Collapse>
        ))}
      </Container>
      <IngredientForm open={open} onClose={handleCloseForm} ingr={ingrForm} />
      <DialogDelete
        open={openX}
        onClose={onClose}
        onDelete={() => onDelete(modalDelete.values)}
      />
    </>
  );
}

export default websitePageHOC(Ingredients, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Ingredients',
    },
  },
});

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  // if no session found(user hasn’t logged in)
  if (!session) {
    return {
      redirect: {
        destination: '/', // redirect user to homepage
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
