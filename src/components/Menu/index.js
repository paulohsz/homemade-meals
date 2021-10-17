import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
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
  Menu as MenuMUI,
  MenuItem,
} from '@mui/material';
import { AccountCircle, Logout, Menu as MenuIcon } from '@mui/icons-material';

function Menu() {
  const { pathname, push } = useRouter();

  const menu = [
    { label: 'Ingredients', value: '/list/ingredients' },
    { label: 'Users', value: '/list/users' },
    { label: 'About', value: '/about' },
  ];

  const [menuActive, setMenuActive] = useState(false);
  const [menuSm, setMenuSm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const profileOpen = Boolean(anchorEl);

  const handleClose = () => {
    setMenuActive(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (menu.find((element) => element.value === pathname) !== undefined) {
      setMenuActive(pathname);
    }
  }, [pathname]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const clickIcon = (value) => {
    push(value);
    setMenuActive(value);
    setMenuSm(false);
  };

  const handleChangeTab = (event, newValue) => {
    clickIcon(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setMenuSm(open);
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
            onClick={() => { clickIcon(item.value); }}
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
    </Box>
  );

  return (
    pathname !== '/auth/sign-in' && pathname !== '/' && (
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
          <Tabs value={menuActive} onChange={handleChangeTab} centered>
            {menu.map((item, index) => (
              <Tab
                sx={{ px: 4, py: 3 }}
                key={`menu_${index}_${item.value}`} // eslint-disable-line react/no-array-index-key
                label={item.label}
                value={item.value}
              />
            ))}
            <Box sx={{
              position: 'absolute',
              right: 0,
              mt: 1,
              pr: 3,
            }}
            >
              <IconButton
                size="large"
                edge="end"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle />
              </IconButton>
            </Box>
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
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                size="large"
                edge="end"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
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
      <MenuMUI
        id="basic-menu"
        anchorEl={anchorEl}
        open={profileOpen}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => { push('/profile/update-password'); handleClose(); }}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={async () => { await signOut({ redirect: false }); push('/auth/sign-in'); handleClose(); }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </MenuItem>
      </MenuMUI>
    </>
    )
  );
}

export default Menu;
