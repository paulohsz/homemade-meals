/* eslint-disable no-console */
import React, {
  useState, useEffect, createContext, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useSession } from 'next-auth/client';
import { userGetAll } from '../services/usersService';
import usePrevious from '../utils/usePrevious';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [session] = useSession();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const prevSession = usePrevious(session);

  useEffect(() => {
    if (users.length === 0 && session && Boolean(session) !== Boolean(prevSession)) {
      setIsLoading(true);
      userGetAll()
        .then((res) => setUsers(res))
        .catch((error) => {
          enqueueSnackbar('Something is wrong when request users', { variant: 'error' });
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
      console.log('ContextUser');
    } else {
      if (!session) setUsers([]);
      if (prevSession === undefined) setIsLoading(false);
    }
  }, [session]);

  const deleteUser = (id) => {
    const usersNew = users.map((item) => (item._id === id ? { ...item, delete: true } : item));
    setUsers(usersNew);
  };

  const addUser = (user) => {
    setUsers([user, ...users]);
  };
  const updateUser = (user) => {
    setUsers(users.map((item) => (item._id === user._id ? user : item)));
  };

  return (
    <UsersContext.Provider value={{
      users,
      loadingUsers: isLoading,
      setUsers,
      addUser,
      deleteUser,
      updateUser,
    }}
    >
      {children}
    </UsersContext.Provider>
  );
};
UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUsers = () => useContext(UsersContext);
