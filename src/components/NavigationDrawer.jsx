<<<<<<< HEAD
import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Paper,
} from '@mui/material'
import { useRouter } from 'next/router' // Import the useRouter hook

function NavigationDrawer({ open, onClose }) {
    const router = useRouter() // Initialize the useRouter hook

    const navigateTo = (path) => {
        router.push(path) // Use the push method to navigate to the specified path
        onClose() // Close the drawer after navigation
    }

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            {/* Use Paper to control the width of the Drawer */}
            <Paper style={styles.NavigationDrawer}>
                <List>
                    {/* Use the ListItem component correctly */}
                    <ListItem
                        button
                        onClick={() => navigateTo('/recipe-index')}
                    >
                        {/* Use the Button component inside ListItem */}
                        <Button>
                            <ListItemText primary="Browse Recipes" />
                        </Button>
                    </ListItem>
                    <ListItem button onClick={() => navigateTo('/ingredients')}>
                        <Button>
                            <ListItemText primary="Browse Ingredients" />
                        </Button>
                    </ListItem>
                    <ListItem button onClick={() => navigateTo('/my-recipes')}>
                        <Button>
                            <ListItemText primary="My Recipes" />
                        </Button>
                    </ListItem>
                    <ListItem button onClick={() => navigateTo('/recipes')}>
                        <Button>
                            <ListItemText primary="Add New Recipe" />
                        </Button>
                    </ListItem>
                    <ListItem button onClick={() => navigateTo('/recipes')}>
                        {/* If this is a placeholder, you may want to add text or content */}
                    </ListItem>
                    {/* Add more navigation links as needed */}
                </List>
            </Paper>
        </Drawer>
    )
}

const styles = {
    NavigationDrawer: {
        width: '500px', // Adjust the width as needed
    },
}
=======
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Button, Paper, Typography } from '@mui/material';
import Link from 'next/link';

function NavigationDrawer({ open, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {/* Use Paper to control the width of the Drawer */}
      <Paper style={styles.NavigationDrawer}>
        <List>
          {/* Use the Button component for clickable items */}
          <ListItem Button onClick={onClose}>
            <Link href="/">
              <Button>
                <ListItemText primary={<Typography style={styles.firstListItemText}>Home</Typography>} />
              </Button>
            </Link>
          </ListItem>
          <ListItem Button onClick={onClose}>
            <Link href="/">
              <Button>
                <ListItemText primary={<Typography style={styles.listItemText}>My Recipes</Typography>} />
              </Button>
            </Link>
          </ListItem>
          <ListItem Button onClick={onClose}>
            <Link href="/recipes">
              <Button>
                <ListItemText primary={<Typography style={styles.listItemText}>Add a Recipe</Typography>} />
              </Button>
            </Link>
          </ListItem>
          <ListItem Button onClick={onClose}>
            <Link href="/recipe-index">
              <Button>
                <ListItemText primary={<Typography style={styles.listItemText}>All Recipes</Typography>} />
              </Button>
            </Link>
          </ListItem>
          <ListItem Button onClick={onClose}>
            <Link href="/">
              <Button>
                <ListItemText primary={<Typography style={styles.listItemText}>All Ingredients</Typography>} />
              </Button>
            </Link>
          </ListItem>
          <ListItem Button onClick={onClose}>
            <Link href="/">
              <Button>
                <ListItemText primary={<Typography style={styles.listItemText}>Advanced Search</Typography>} />
              </Button>
            </Link>
          </ListItem>
          {/* Add more navigation links as needed */}
        </List>
      </Paper>
    </Drawer>
  );
}

const styles = {
  NavigationDrawer: {
    width: '400px', // Adjust the width as needed
    height: '100vh',
  },
  listItemText: {
    fontSize: '20px',
    // fontWeight: 'bold',
  },
  firstListItemText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#de5006',
  }
};
>>>>>>> c0a26588ee2917d07a9bf8eb4d786c6a947d1860

export default NavigationDrawer
