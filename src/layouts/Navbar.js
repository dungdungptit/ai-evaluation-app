// material
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, List } from '@mui/material';
import { Link } from 'react-router-dom';
// Logo
import logo from '../assets/images/logo_ptit.png';

// components
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

//
import MenuIcon from '@mui/icons-material/Menu';
import AccountPopover from './AccountPopover';
// import NotificationsPopover from './NotificationsPopover';
import { useState } from 'react';
import LanguagePopover from './LanguagePopover';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: "0 1px 6px 0 rgb(32 33 36 / 28%)",
    backdropFilter: 'blur(6px)',
    position: 'fixed',
    top: 0,
    zIndex: 999,
    color: '#fff',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: '#009be5',
    [theme.breakpoints.up('lg')]: {
        width: "100%",
    },
    [theme.breakpoints.down('md')]: {
        minWidth: `300px`,
    },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
        // minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

const pages = [
    { name: 'Problems', linkTo: "problems" },
    { name: 'History', linkTo: "history" },
    // { name: 'Guide', linkTo: "guide" },
    // { name: 'Contact', linkTo: "contact" },
]

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <RootStyle>
            <ToolbarStyle>
                <Box component={Link} to='problems' sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    cursor: 'pointer',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    overflow: 'hidden',
                    border: '1px solid',
                    mr: 1,
                    borderColor: 'grey.500',
                    backgroundColor: 'white',
                }}>
                    <img src={logo} alt="logo"
                        style={{
                            width: '20.79px',
                            objectFit: 'contain'
                        }} />
                </Box>

                {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography> */}

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        sx={{ color: '#000' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem
                                key={page.name}
                                component={Link}
                                to={page.linkTo}
                                onClick={handleCloseNavMenu}>
                                <Typography textAlign="center" color="#000" sx={{ fontWeight: 'bold', fontSize: 14 }}>{page.name}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: "center", my: "auto" }}>
                    <Box component={Link} to='/' sx={{
                        display: { xs: 'flex', md: 'none' },
                        alignItems: 'center',
                        cursor: 'pointer',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        width: 36,
                        height: 36,
                        overflow: 'hidden',
                        border: '1px solid',
                        mr: 1,
                        borderColor: 'grey.500',
                        backgroundColor: 'white',
                    }}>
                        <img src={logo} alt="logo"
                            style={{
                                width: '20.79px',
                                objectFit: 'contain'
                            }} />
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography> */}
                </Box>

                <List sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button
                            key={page.name}
                            onClick={handleCloseNavMenu}
                            component={Link}
                            to={page.linkTo}
                            sx={{ my: 0, color: '#fff', display: 'block', fontWeight: 500, fontSize: 14 }}
                        >
                            {page.name}
                        </Button>
                    ))}
                </List>


                {/* <Searchbar /> */}
                <Box sx={{ flexGrow: 1 }} />

                <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                    <LanguagePopover />
                    {/* <NotificationsPopover /> */}
                    <AccountPopover />
                </Stack>
            </ToolbarStyle>
        </RootStyle>
    )
}

export default Navbar