import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tooltip,
  Button,
  TextField,
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
// import UserForm from '../../../src/forms/userForm';
import websitePageHOC from '../../../src/components/wrappers/WebsitePage/hoc';
import GridMain from 'src/components/grid/GridMain';
// import { useWebsitePage } from '../../../src/provider/WebsitePageContext';
// import GridHM, { DeleteButton, ViewButton } from '../../../src/components/commons/GridHM';
// import Menu3Dots from '../../../src/components/commons/Menu3Dots';

function Users() {
  const searchSettings = {
    fields: ['name', 'email'],
    orderByInitial: 'name',
  };
  const userList = [
    // {
    //   _id: '630fc9dbbe276a7341a56ed5',
    //   name: 'Paulo Henrique Stocco Zancanaro3',
    //   email: 'paulostoc@gmail.com',
    //   observation: 'Observation',
    //   status: 'active',
    //   createdAt: '2022-08-31T20:51:39.134Z',
    //   updatedAt: '2022-08-31T20:51:39.134Z',
    // },
    // {
    //   _id: '630fc9dbbe276a7341a56ed6',
    //   name: 'Paulo Henrique Stocco Zancanaro2',
    //   email: 'paulostoc@gmail.com',
    //   observation: 'Observation',
    //   status: 'active',
    //   createdAt: '2022-08-31T20:51:39.134Z',
    //   updatedAt: '2022-08-31T20:51:39.134Z',
    // },
  ];
  const columnsSettings = [
    { id: '_id', label: 'Id' },
    {
      id: 'name',
      label: 'Name',
      cellSx: { display: 'flex', alignItems: 'center' },
    },
    { id: 'email', label: 'Email' },
    { id: 'status', label: 'status' },
  ];

  // const { users, deleteUser, loadingUsers } = useUsers();
  // const { toggleLoading } = useWebsitePage();
  // const [usrs, setUsrs] = useState([]);
  // const [search, setSearch] = useState('');
  // const [open, setOpen] = useState(false);
  // const [usrForm, setUsrForm] = useState({});
  // const [openX, setOpenX] = useState(false);
  // const [modalDelete, setModalDelete] = useState({
  //   values: null,
  // });

  // const funcSearch = (string) => {
  //   setUsrs(
  //     users.map((item) => (item.search.indexOf(string.toLowerCase()) > -1
  //       ? { ...item, filter: true }
  //       : { ...item, filter: false })),
  //   );
  // };

  // useEffect(() => {
  //   funcSearch(search);
  // }, [users]);

  // const onConfirmDelete = (id) => {
  //   setOpenX(true);
  //   setModalDelete({ ...modalDelete, values: id });
  // };
  // const onDelete = (id) => {
  //   setOpenX(false);
  //   toggleModalLoading(true);
  //   userDelete(id)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setModalDelete({ values: null });
  //         deleteUser(id);
  //       }
  //     })
  //     .finally(() => {
  //       toggleModalLoading(false);
  //     });
  // };
  // const onClose = () => {
  //   setOpenX(false);
  //   toggleModalLoading(false);
  //   setModalDelete({ values: null });
  // };

  // const handleCloseForm = () => {
  //   setOpen(false);
  //   setTimeout(() => setUsrForm({}), 200);
  // };

  // const ActionsRenderer = (user) => {
  //   const { _id } = user;
  //   const menuAction = [
  //     {
  //       _id,
  //       button: ViewButton,
  //       title: 'Edit',
  //       label: 'edit',
  //       onClick: () => {
  //         setOpen(true);
  //         setUsrForm(user);
  //       },
  //       itemIcon: <Edit fontSize="small" />,
  //     },
  //     {
  //       _id,
  //       button: DeleteButton,
  //       title: 'Delete',
  //       label: 'delete',
  //       onClick: () => onConfirmDelete(_id),
  //       itemIcon: <Delete fontSize="small" />,
  //     },
  //   ];
  //   return (
  //     <>
  //       <Box display={{ xs: 'none', sm: 'flex' }} justifyContent="space-evenly">
  //         {menuAction.map((item) => {
  //           const { label, onClick } = item;
  //           const ButtonAction = item.button;
  //           return (
  //             <ButtonAction
  //               key={`mb_${label}_${_id}`}
  //               aria-label={label}
  //               onClick={onClick}
  //             />
  //           );
  //         })}
  //       </Box>
  //       <Box display={{ xs: 'block', sm: 'none' }}>
  //         <Menu3Dots itemsMenu={menuAction} />
  //       </Box>
  //     </>
  //   );
  // };

  // const columnCustomDefs = {
  //   columns: [
  //     {
  //       headerName: 'Name',
  //       field: 'name',
  //       propsCell: { xs: 10, sm: 6 },
  //     },
  //     {
  //       headerName: 'Email',
  //       field: 'email',
  //       propsCell: { xs: false, sm: 4, display: { xs: 'none', sm: 'block' } },
  //     },
  //     {
  //       headerName: 'Action',
  //       field: 'action',
  //       cellFunction: ActionsRenderer,
  //       propsCell: { xs: 2, textAlign: 'center' },
  //     },
  //   ],
  // };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Users
        </Typography>
        <Box sx={{ textAlign: 'end' }}>
          <Tooltip title="Create user" placement="top" enterDelay={500} arrow>
            <Button startIcon={<Add />}>
              {/* <Button onClick={() => setOpen(true)} startIcon={<Add />}> */}
              User
            </Button>
          </Tooltip>
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
        <GridMain
              data={userList}
              isLoading={false}
              filterString={''}
              emptyDataMessage="Nenhum usuário registrado."
              settings={{
                columns: columnsSettings,
                search: searchSettings,
              }}
            />
        {/* <GridHM
          columnDefs={columnCustomDefs}
          data={usrs}
          loadingData={loadingUsers}
          noRows={Boolean(!loadingUsers && users.length === 0)}
        /> */}
      </Container>
      {/* <UserForm open={open} onClose={handleCloseForm} usr={usrForm} />
      <DialogDelete
        open={openX}
        onClose={onClose}
        onDelete={() => onDelete(modalDelete.values)}
      /> */}
    </>
  );
}

export default websitePageHOC(Users, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Users',
    },
    authenticator: {
      isRequired: true,
    },
  },
});
