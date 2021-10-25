import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, ListItemIcon, ListItemText, Menu, MenuItem,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

function Menu3Dots({ itemsMenu }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (onClick) => {
    setAnchorEl(null);
    onClick();
  };

  return (
    <div>
      <IconButton
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {itemsMenu.map((item) => (
          <MenuItem key={`mm_${item.label}_${item._id}`} onClick={() => handleClose(item.onClick)}>
            { item.itemIcon && (
            <ListItemIcon>
              {item.itemIcon}
            </ListItemIcon>
            )}
            <ListItemText>{item.title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

Menu3Dots.propTypes = {
  itemsMenu: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      itemIcon: PropTypes.node.isRequired,
    }),
  ).isRequired,
};

export default Menu3Dots;
