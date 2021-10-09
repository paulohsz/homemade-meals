import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Tabs,
  Tab,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Hidden,
} from '@mui/material';
import { Logout, Menu as MenuIcon } from '@mui/icons-material';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

function Menu({ router }) {
  const { pathname } = router;

  const menu = [
    { label: 'Ingredients', value: '/list/ingredients' },
    { label: 'Item Two', value: 1 },
    { label: 'Item Three', value: 2 },
  ];

  const [menuActive, setMenuActive] = useState(menu[0].value);
  const [menuSm, setMenuSm] = useState(false);

  useEffect(() => {
    setMenuActive(pathname);
  }, []);

  const handleChange = (event, newValue) => {
    // console.log(event, newValue);
    console.log(newValue);
    setMenuActive(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    console.log('toggleDrawer', open);
    setMenuSm(open);
  };

  const clickIcon = (value) => {
    console.log('clickIcon', value);
    setMenuActive(value);
    setMenuSm(false);
  };

  const list = () => (
    <Box
      sx={{ width: 230 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menu.map((item) => (
          <ListItem
            button
            key={item.label}
            onClick={() => clickIcon(item.value)}
          >
            <ListItemText
              primary={item.label}
              {...(item.value === menuActive && {
                primaryTypographyProps: { color: 'primary' },
              })}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          width: '100%',
          mb: 4,
          bgcolor: 'background.paper',
          boxShadow: { sm: 4 },
        }}
      >
        <Hidden only="xs">
          <Tabs value={menuActive} onChange={handleChange} centered>
            {menu.map((item) => (
              <Tab
                sx={{ px: 4, py: 3 }}
                key={`menu_${item.value}`}
                label={item.label}
                value={item.value}
              />
            ))}
          </Tabs>
        </Hidden>
        <Hidden smUp>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setMenuSm(true)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
            open={menuSm}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
        </Hidden>
      </Box>
    </>
  );
}

export default withRouter(Menu);

Menu.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
