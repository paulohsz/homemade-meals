/* eslint-disable no-console */
import React, {
  useState, useEffect, createContext, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useSession } from 'next-auth/client';
import { ingredientGetAll } from '../services/ingredientsService';
import usePrevious from '../utils/usePrevious';

export const IngredientsContext = createContext();

export const IngredientsProvider = ({ children }) => {
  const [session] = useSession();
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const prevSession = usePrevious(session);

  useEffect(() => {
    // const setingredientsStorage = localStorage.setItem('ingredients', JSON.stringify(data));
    // const getingredientsStorage = localStorage.getItem('ingredients');
    // const destroyingredientsStorage = localStorage.removeItem('ingredients');
    if (ingredients.length === 0 && session && Boolean(session) !== Boolean(prevSession)) {
      setIsLoading(true);
      ingredientGetAll()
        .then((res) => setIngredients(res))
        .catch((error) => {
          enqueueSnackbar('Something is wrong when request ingredients', { variant: 'error' });
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        })
        .finally(() => setIsLoading(false));
      console.log('ContextIngredient');
    } else {
      if (!session) setIngredients([]);
      if (prevSession === undefined) setIsLoading(false);
    }
  }, [session]);

  const deleteIngredient = (id) => {
    const ingredientsNew = ingredients.map((item) => (item._id === id ? { ...item, delete: true } : item));// eslint-disable-line max-len
    setIngredients(ingredientsNew);
  };

  const addIngredient = (ingredient) => {
    setIngredients([ingredient, ...ingredients]);
  };
  const updateIngredient = (ingredient) => {
    setIngredients(ingredients.map((item) => (item._id === ingredient._id ? ingredient : item)));
  };

  return (
    <IngredientsContext.Provider value={{
      ingredients,
      loadingIngr: isLoading,
      setIngredients,
      addIngredient,
      deleteIngredient,
      updateIngredient,
    }}
    >
      {children}
    </IngredientsContext.Provider>
  );
};
IngredientsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useIngredients = () => useContext(IngredientsContext);
