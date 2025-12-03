import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Box } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <AccountCircle />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          style: { padding: 8 }
        }}
      >
        <SimpleTreeView>
          <TreeItem itemId='acc' label='Tài khoản'>
            <TreeItem itemId='pro' label='Profile' />
            <TreeItem itemId='set' label='Settings' />
            <TreeItem itemId='out' label='Logout' />
          </TreeItem>
        </SimpleTreeView>
      </Menu>
    </Box>
  );
}
