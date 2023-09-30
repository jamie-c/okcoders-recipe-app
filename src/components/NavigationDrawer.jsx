import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material'
import Link from 'next/link'
import SearchBar from './SearchBar'

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
                                <ListItemText
                                    primary={
                                        <Typography
                                            style={styles.firstListItemText}
                                        >
                                            Home
                                        </Typography>
                                    }
                                />
                            </Button>
                        </Link>
                    </ListItem>
                    <ListItem Button onClick={onClose}>
                        <Link href="/recipes/my-recipes">
                            <Button>
                                <ListItemText
                                    primary={
                                        <Typography style={styles.listItemText}>
                                            My Recipes
                                        </Typography>
                                    }
                                />
                            </Button>
                        </Link>
                    </ListItem>
                    <ListItem Button onClick={onClose}>
                        <Link href="/recipes/add">
                            <Button>
                                <ListItemText
                                    primary={
                                        <Typography style={styles.listItemText}>
                                            Add a Recipe
                                        </Typography>
                                    }
                                />
                            </Button>
                        </Link>
                    </ListItem>
                    <ListItem Button onClick={onClose}>
                        <Link href="/recipes">
                            <Button>
                                <ListItemText
                                    primary={
                                        <Typography style={styles.listItemText}>
                                            All Recipes
                                        </Typography>
                                    }
                                />
                            </Button>
                        </Link>
                    </ListItem>
                    <ListItem Button onClick={onClose}>
                        <Link href="/" disabled>
                            <Button disabled>
                                <ListItemText
                                    primary={
                                        <Typography style={styles.listItemText}>
                                            All Ingredients
                                        </Typography>
                                    }
                                />
                            </Button>
                        </Link>
                    </ListItem>
                    <ListItem Button onClick={onClose}>
                        <Link href="/" disabled>
                            <Button disabled>
                                <ListItemText
                                    primary={
                                        <Typography style={styles.listItemText}>
                                            Advanced Search
                                        </Typography>
                                    }
                                />
                            </Button>
                        </Link>
                    </ListItem>
                    {/* Add more navigation links as needed */}
                </List>
                <SearchBar />
            </Paper>
        </Drawer>
    )
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
    },
}

export default NavigationDrawer
