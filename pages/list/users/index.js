import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import {
  Box,
  Collapse,
  Container,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  Add, Delete, Edit,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useUsers } from '../../../src/provider/UsersContext';
import TextFieldHM from '../../../src/components/forms/TextFieldHM';
import UserForm from '../../../src/forms/userForm';
import { userDelete } from '../../../src/services/usersService';
import Loading from '../../../src/components/commons/Loading';
import DialogDelete from '../../../src/components/commons/dialog/dialogDelete';
import ButtonHM from '../../../src/components/forms/ButtonHM';

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

function Users() {
  const { users, deleteUser, loadingIngr } = useUsers();
  const [ingr, setIngr] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [ingrForm, setIngrForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openX, setOpenX] = useState(false);
  const [modalDelete, setModalDelete] = useState({
    values: null,
  });

  const funcSearch = (string) => {
    setIngr(
      users.map((item) => (item.search.indexOf(string.toLowerCase()) > -1
        ? { ...item, filter: true }
        : { ...item, filter: false })),
    );
  };

  useEffect(() => {
    funcSearch(search);
  }, [users]);

  const onConfirmDelete = (id) => {
    setOpenX(true);
    setModalDelete({ ...modalDelete, values: id });
  };
  const onDelete = (id) => {
    setOpenX(false);
    setIsLoading(true);
    userDelete(id)
      .then((res) => {
        if (res.status === 200) {
          setModalDelete({ values: null });
          deleteUser(id);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onClose = () => {
    setOpenX(false);
    setIsLoading(false);
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
          Users
        </Typography>
        <Box sx={{ textAlign: 'end' }}>
          <Tooltip title="Create user" placement="top" enterDelay={500} arrow>
            <ButtonHM onClick={() => setOpen(true)} startIcon={<Add />}>
              User
            </ButtonHM>
          </Tooltip>
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
            xs={6}
            item
          >
            Name
          </Box>
          <Box
            component={Grid}
            xs={4}
            item
          >
            Email
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
        <Collapse in={!loadingIngr && ingr.length === 0}>
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
        {ingr.map((user) => (
          <Collapse
            key={user._id}
            in={user.delete === undefined && user.filter}
          >
            <GridRow container>
              <Box
                component={Grid}
                xs={6}
                item
              >
                {user.name}
              </Box>
              <Box
                component={Grid}
                xs={4}
                item
              >
                {user.email}
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
                      setIngrForm(user);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => onConfirmDelete(user._id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </GridRow>
          </Collapse>
        ))}
      </Container>
      <UserForm open={open} onClose={handleCloseForm} ingr={ingrForm} />
      <Loading open={isLoading} />
      <DialogDelete
        open={openX}
        onClose={onClose}
        onDelete={() => onDelete(modalDelete.values)}
      />
    </>
  );
}

export default Users;

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
