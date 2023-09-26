import { UserButton } from '@clerk/nextjs'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { Box, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import NavigationDrawer from './NavigationDrawer'

function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false)
    }

    return (
        <div style={styles.container}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 10px',
                    opacity: '1',
                    zIndex: '999',
                }}
            >
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: '2rem',
                                sm: '3.25rem',
                            },
                        }}
                        fontFamily={'Dosis'}
                        color="primary"
                        textTransform="uppercase"
                        fontWeight="bold"
                        letterSpacing="5px"
                    >
                        Cookbook
                    </Typography>
                </Link>
                <span
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    {/* Toggle the drawer when MenuBookIcon is clicked */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        style={styles.menuButton}
                        onClick={toggleDrawer}
                    >
                        <MenuBookIcon style={styles.menuIcon} />
                    </IconButton>

                    <UserButton afterSignOutUrl="/" />
                </span>
            </Box>
            <NavigationDrawer open={isDrawerOpen} onClose={closeDrawer} />
        </div>
    )
}

const styles = {
    container: {
        position: 'sticky',
        top: '0',
        width: '100vw',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        zIndex: '900',
    },
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
    menuButton: {
        // Add any additional styling as needed
    },
    menuIcon: {
        fontSize: '2.75rem',
        // Add any additional styling as needed
    },
    userIcon: {
        fontSize: '2.75rem',
        // Add any additional styling as needed
    },
}

export default Header
