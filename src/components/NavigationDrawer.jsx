import React from 'react';
import { Drawer, List, ListItem, ListItemText, Button, Paper } from '@mui/material';

function NavigationDrawer({ open, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {/* Use Paper to control the width of the Drawer */}
      <Paper style={styles.NavigationDrawer}>
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
      </Paper>
    </Drawer>
  );
}

const styles = {
  NavigationDrawer: {
    width: '500px', // Adjust the width as needed
  },
};

export default NavigationDrawer;
