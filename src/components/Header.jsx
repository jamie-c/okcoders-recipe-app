import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Import MenuBookIcon
import { UserButton } from '@clerk/nextjs'; // Import UserButton
import NavigationDrawer from './NavigationDrawer';
import Link from 'next/link';

import { theme } from '@/lib/theme';

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ top: '0', backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', zIndex: '900' }}>
                <Toolbar>
                    <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>Cookbook</Link>
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer} // Open the drawer when MenuBookIcon is clicked
                    >
                        <MenuBookIcon sx={{ fontSize: '2.5rem', color: '#006400' }} />
                    </IconButton>
                    <Link href="/" style={{ textDecoration: 'none' }}></Link>
                    <UserButton afterSignOutUrl="/" />
                </Toolbar>
            </AppBar>
            <NavigationDrawer open={isDrawerOpen} onClose={closeDrawer} />
        </Box>
    );
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
        width: '80vw',
    },
};