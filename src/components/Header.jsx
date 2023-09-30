import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { UserButton } from '@clerk/nextjs';
import NavigationDrawer from './NavigationDrawer';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { theme } from '@/lib/theme';

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const router = useRouter();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const isHomePage = router.pathname === '/';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ top: '0', backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', zIndex: '900' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {!isHomePage && (
                        <Typography variant="h2" component="div">
                            <Link href="/" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>Cookbook.io</Link>
                        </Typography>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer}
                        >
                            <MenuBookIcon sx={{ fontSize: '2.5rem', color: '#006400' }} />
                        </IconButton>
                        <UserButton afterSignOutUrl="/" />
                    </div>

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