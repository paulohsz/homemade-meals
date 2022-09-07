import Add from '@mui/icons-material/Add';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import websitePageHOC from 'src/components/wrappers/WebsitePage/hoc';

const Ingredients = () => {


  return     <>
  <Container maxWidth="md">
    <Typography variant="h3" component="h1" align="center" gutterBottom>
      Ingredients
    </Typography>
    <Box sx={{ textAlign: 'end' }}>
      {/* <Button onClick={() => setOpen(true)} startIcon={<Add />}> */}
      <Button startIcon={<Add />}>
        Ingredient
      </Button>
    </Box>
    <Box my={3} mx={5}>
      <TextField
        id="search"
        label="Search"
        // value={search}
        // onChange={(e) => {
        //   setSearch(e.target.value);
        //   funcSearch(e.target.value);
        // }}
        margin="none"
        size="small"
        fullWidth
      />
    </Box>
    {/* <GridHM
      columnDefs={columnCustomDefs}
      data={ingr}
      loadingData={loadingIngr}
      noRows={Boolean(!loadingIngr && ingredients.length === 0)}
    /> */}
  </Container>
  {/* <IngredientForm open={open} onClose={handleCloseForm} ingr={ingrForm} />
  <DialogDelete
    open={openX}
    onClose={onClose}
    onDelete={() => onDelete(modalDelete.values)}
  /> */}
</>;
}

export default websitePageHOC(Ingredients, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Logout',
    },
    authenticator: {
      isRequired: true,
    },
    menuProps: {
      display: true,
    },
  },
});
