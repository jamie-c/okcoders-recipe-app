import MenuBookIcon from '@mui/icons-material/MenuBook'
import { IconButton, TextField, Typography } from '@mui/material'

function Header() {
    return (
        <div style={styles.container}>
            <div style={styles.headerContent}>
                <Typography
                    sx={{
                        fontSize: {
                            xs: '2.5rem',
                            sm: '3.25rem',
                        },
                    }}
                    color="primary"
                    textTransform="uppercase"
                    fontWeight="bold"
                    letterSpacing="5px"
                >
                    Cookbook
                </Typography>
                <TextField
                    color="primary"
                    fullWidth
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    style={styles.searchField}
                />
                <IconButton
                    size="large"
                    edge="start"
                    color="primary"
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
        padding: '0 10px',
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
        // Add any additional styling as needed
    },
}

export default Header
