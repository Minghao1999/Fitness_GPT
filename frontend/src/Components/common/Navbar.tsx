import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    styled,
    Typography,
    Avatar,
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import Logo from '../../assets/images/Logo.png';

const ModalNavButton = styled(Button)(({ theme }) => ({
    borderBottom: '3px solid transparent',
    fontSize: 28,
    fontWeight: 300,
    transition: theme.transitions.create('transform'),
    '&:hover': {
        transform: 'scale(1.1)',
    },
}));

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();
    const activeRoutes = {
        home: location.pathname === '/',
        exercises: location.pathname.includes('/exercises'),
        favorites: location.pathname === '/favorites',
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container sx={{ height: { xs: 70, sm: 80 }, py: { xs: 1 / 2, sm: 1 } }}>
            <Stack
                direction="row"
                justifyContent={{ xs: 'space-between', sm: 'space-between' }}
                alignItems="center"
                spacing={{ xs: 1, sm: 5 }}
            >
                <Button component={Link} to="/" color="richBlack">
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        gap={2}
                    >
                        <img src={Logo} alt="app logo" width={48} height={48} />
                        <Typography
                            variant="h5"
                            component="p"
                            fontFamily="logoFontFamily"
                            fontWeight={700}
                        >
                            Fitness GPT
                        </Typography>
                    </Stack>
                </Button>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    display={{ xs: 'none', sm: 'block' }}
                >
                    <Button
                        component={NavLink}
                        to="/"
                        color="richBlack"
                        sx={{
                            borderBottom: 3,
                            borderBottomColor: activeRoutes.home
                                ? 'redRYB.main'
                                : 'transparent',
                        }}
                        end
                    >
                        Home
                    </Button>
                    <Button
                        component={NavLink}
                        to="/about"
                        color="richBlack"
                        sx={{
                            borderBottom: 3,
                            borderBottomColor: activeRoutes.exercises
                                ? 'redRYB.main'
                                : 'transparent',
                        }}
                    >
                        About
                    </Button>
                    <Button
                        component={NavLink}
                        to="/login"
                        color="richBlack"
                        sx={{
                            borderBottom: 3,
                            borderBottomColor: activeRoutes.favorites
                                ? 'redRYB.main'
                                : 'transparent',
                        }}
                    >
                        Login
                    </Button>
                </Stack>
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{ display: { xs: 'block', sm: 'block' }, ml: 'auto' }}
                    color="inherit"
                >
                    <AccountCircle fontSize="large" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem component={Link} to="/accountinfo" onClick={handleMenuClose}>
    <Avatar sx={{ mr: 2 }} /> Account
</MenuItem>

                    <MenuItem onClick={handleMenuClose}>My Training Plan</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Menu>
            </Stack>
        </Container>
    );
};

export default Navbar;