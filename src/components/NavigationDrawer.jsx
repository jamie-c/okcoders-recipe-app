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
                    {/* Use the navigateTo function for client-side navigation */}
                    <ListItem
                        Button
                        onClick={() => navigateTo('/recipe-index')}
                    >
                        <Button>
                            <ListItemText primary="Browse Recipes" />
                        </Button>
                    </ListItem>
                    <ListItem Button onClick={() => navigateTo('/ingredients')}>
                        <Button>
                            <ListItemText primary="Browse Ingredients" />
                        </Button>
                    </ListItem>
                    <ListItem Button onClick={() => navigateTo('/my-recipes')}>
                        <Button>
                            <ListItemText primary="My Recipes" />
                        </Button>
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
