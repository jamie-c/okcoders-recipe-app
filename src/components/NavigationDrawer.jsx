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

export default NavigationDrawer
