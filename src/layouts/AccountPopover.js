import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import account from "../data/account";
import { logout } from "../store/reducers/authSlice";

const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: 'eva:home-fill',
        linkTo: '/',
    },
    {
        label: 'Profile',
        icon: 'eva:person-fill',
        linkTo: '#',
    },
    {
        label: 'Settings',
        icon: 'eva:settings-2-fill',
        linkTo: '#',
    },
];

const AccountPopover = () => {

    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location.state);

    const [anchorElAccount, setAnchorElAccount] = useState(null);

    const handleOpenAccountMenu = (event) => {
        setAnchorElAccount(event.currentTarget);
    };

    const handleCloseAccountMenu = () => {
        setAnchorElAccount(null);
    };
    
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(logout());
        window.location.reload();
        // navigate('/login');
    };

    const useAuth = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user);
        } else {
            return null
        }
    }
    const auth = useAuth();

    return (
        <Fragment>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenAccountMenu} sx={{ p: 0 }}>
                        <Avatar alt={auth.username} src={auth.photoURL} sx={{ width: 32, height: 32 }} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElAccount}
                    open={Boolean(anchorElAccount)}
                    onClose={handleCloseAccountMenu}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}

                >
                    <Box sx={{ my: 1.5, px: 2 }}>
                        <Typography variant="subtitle1" noWrap sx={{ fontWeight: "bold" }}>
                            {auth.username}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {auth.email}
                        </Typography>
                    </Box>

                    <Divider sx={{ borderStyle: 'solid' }} />

                    <Stack sx={{ py: 1 }}>
                        {MENU_OPTIONS.map((option) => (
                            <MenuItem key={option.label} component={Link} to={option.linkTo} onClick={handleCloseAccountMenu}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Stack>

                    <Divider sx={{ borderStyle: 'solid' }} />

                    <MenuItem onClick={handleLogout} sx={{ py: 1, mt: 1 }}>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </Fragment>
    )
};

export default AccountPopover;