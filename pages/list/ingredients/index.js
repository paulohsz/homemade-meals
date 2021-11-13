import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useIngredients } from '../../../src/provider/IngredientsContext';
import TextFieldHM from '../../../src/components/forms/TextFieldHM';
import IngredientForm from '../../../src/forms/ingredientForm';
import { ingredientDelete } from '../../../src/services/ingredientsService';
import DialogDelete from '../../../src/components/commons/dialog/dialogDelete';
import websitePageHOC from '../../../src/components/wrappers/WebsitePage/hoc';
import { useWebsitePage } from '../../../src/provider/WebsitePageContext';
import euroFormatter from '../../../src/utils/euroFormatter';
import GridHM, { DeleteButton, ViewButton } from '../../../src/components/commons/GridHM';
import ButtonHM from '../../../src/components/forms/ButtonHM';
import Menu3Dots from '../../../src/components/commons/Menu3Dots';

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

  const ActionsRenderer = (ingredient) => {
    const { _id } = ingredient;
    const menuAction = [
      {
        _id,
        button: ViewButton,
        title: 'Edit',
        label: 'edit',
        onClick: () => {
          setOpen(true);
          setIngrForm(ingredient);
        },
        itemIcon: <Edit fontSize="small" />,
      },
      {
        _id,
        button: DeleteButton,
        title: 'Delete',
        label: 'delete',
        onClick: () => onConfirmDelete(_id),
        itemIcon: <Delete fontSize="small" />,
      },
    ];
    return (
      <>
        <Box display={{ xs: 'none', sm: 'flex' }} justifyContent="space-evenly">
          {menuAction.map((item) => {
            const ButtonAction = item.button;
            return (
              <ButtonAction
                key={`mb_${item.label}_${_id}`}
                aria-label={item.label}
                onClick={item.onClick}
              />
            );
          })}
        </Box>
        <Box display={{ xs: 'block', sm: 'none' }}>
          <Menu3Dots itemsMenu={menuAction} />
        </Box>
      </>
    );
  };

  const columnCustomDefs = {
    columns: [
      {
        headerName: 'Name',
        field: 'name',
        propsCell: { xs: 4, sm: 3 },
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        propsCell: { xs: 3, sm: 2 },
      },
      {
        headerName: 'Type',
        field: 'type',
        propsCell: { xs: 2, display: { xs: 'none', sm: 'block' } },
      },
      {
        headerName: 'BaseUnit',
        field: 'baseUnit',
        propsCell: { xs: 2, display: { xs: 'none', sm: 'block' } },
      },
      {
        headerName: 'Price',
        field: 'price',
        cellFunction: (data) => euroFormatter.format(data.price),
        propsCell: { xs: 3, sm: 1 },
      },
      {
        headerName: 'Action',
        field: 'action',
        cellFunction: ActionsRenderer,
        propsCell: { xs: 2, textAlign: 'center' },
      },
    ],
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Ingredients
        </Typography>
        <Box sx={{ textAlign: 'end' }}>
          <ButtonHM onClick={() => setOpen(true)} startIcon={<Add />}>
            Ingredient
          </ButtonHM>
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
        <GridHM
          columnDefs={columnCustomDefs}
          data={ingr}
          loadingData={loadingIngr}
          noRows={Boolean(!loadingIngr && ingredients.length === 0)}
        />
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
    authenticator: {
      isRequired: true,
    },
  },
});
