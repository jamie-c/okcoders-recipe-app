import MenuBookIcon from '@mui/icons-material/MenuBook'
import { IconButton, TextField } from '@mui/material'

function Header() {
    return (
        <div style={styles.container}>
            <div style={styles.headerContent}>
                <h1 style={styles.title}>Cookbook</h1>
                <TextField
                    fullWidth
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    style={styles.searchField}
                />
                <IconButton
                    disableRippleFocus
                    disableRipple
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    style={styles.menuButton}
                >
                    <MenuBookIcon style={styles.menuIcon} />
                </IconButton>
            </div>
        </div>
    )
}

const styles = {
    // container: {
    //   border: '1px solid lightgray',
    //   borderRadius: '10px',
    // },
    headerContent: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Dosis',
        textTransform: 'uppercase',
        fontSize: '3.25rem',
        marginLeft: '40px',
        letterSpacing: '5px',
    },
    searchField: {
        marginLeft: '50px',
        marginRight: '50px',
    },
    menuButton: {
        // Add any additional styling as needed
    },
    menuIcon: {
        fontSize: '2.75rem',
        marginRight: '50px',
        // Add any additional styling as needed
    },
}

export default Header
