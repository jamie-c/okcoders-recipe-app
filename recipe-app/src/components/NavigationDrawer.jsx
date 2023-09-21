import React from 'react';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';

function NavigationDrawer({ open, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List>
        {/* Use the Button component for clickable items */}
        <ListItem Button onClick={onClose}>
          <Button>
            <ListItemText primary="Link 1" />
          </Button>
        </ListItem>
        <ListItem Button onClick={onClose}>
          <Button>
            <ListItemText primary="Link 2" />
          </Button>
        </ListItem>
        {/* Add more navigation links as needed */}
      </List>
    </Drawer>
  );
}

export default NavigationDrawer;
