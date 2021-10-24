import React from 'react';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import { IngredientsProvider } from '../../../../provider/IngredientsContext';
import { UsersProvider } from '../../../../provider/UsersContext';

export default function WebsiteGlobalProvider({ children }) {
  return (
    <>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        maxSnack={3}
      >
        <IngredientsProvider>
          <UsersProvider>
            {children}
          </UsersProvider>
        </IngredientsProvider>
      </SnackbarProvider>
    </>
  );
}

WebsiteGlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
