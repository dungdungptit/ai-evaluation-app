import { Box, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useWindowDimensions from '../components/useWindowDimensions/useWindowDimensions';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';

const SidebarBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#101f33'
})

const getIndex = (path) => {
    // get first part of path
    const index = path.split('/')[1];
    switch (index) {
        case 'admin/problems':
            return 0;
        case 'admin/users':
            return 1;
        case 'admin/group':
            return 2;
        case 'admin/subgroup':
            return 3;
        case 'admin/submission':
            return 4;
        case 'admin/admins':
            return 5;
        case 'admin/datasets':
            return 6;
        default:
            return -1;
    }
}

const AdminSidebar = () => {
    const useAuth = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user);
        } else {
            return null
        }
    }

    const isAdmin = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return !!user && JSON.parse(user).role.includes('admin');
        } else {
            return false
        }
    }

    const isSuperAdmin = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return !!user && JSON.parse(user).role.includes('superadmin');
        } else {
            return false
        }
    }
    const location = useLocation();
    const { pathname } = location;
    // console.log(pathname);
    const [selectedIndex, setSelectedIndex] = React.useState(getIndex(pathname));

    const [open, setOpen] = React.useState(true);
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width < 900) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [width, pathname]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSelectedIndex(getIndex(pathname));
    }, [pathname])

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Stack sx={{
            // display: { xs: 'none', lg: 'flex' },
            display: 'flex',
            position: {
                xs: open ? 'fixed' : 'relative',
                md: 'relative',
                lg: 'relative'
            },
            zIndex: open ? 402 : 1,
            borderRight: '1px solid #e0e0e0',
            backgroundColor: '#081627',
            color: '#e6eef5',
            minWidth: open ? 280 : 72,
            width: open ? { xs: 0, lg: 280 } : { xs: 0, lg: 72 },
            transition: 'all 0.3s linear',
            minHeight: "100vh",
        }}>
            <SidebarBox sx={{
                transition: 'all 0.3s linear',
                '& .MuiTypography-root': {
                    display: open ? 'block' : 'none',
                    transition: 'all 0.3s linear',
                },

            }} >
                <Stack direction="row" spacing={0}
                    sx={{
                        alignItems: 'center',
                        justifyContent: open ? 'space-between' : 'center',
                        height: 48,
                        backgroundColor: '#081627',
                        p: open ? 2 : 1, py: 1,
                        '& .MuiSvgIcon-root': {
                            transition: 'all 0.3s linear',
                        },
                    }}
                >
                    <Link className='' to={"/"} style={{ textDecoration: "none", }}>
                        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, p: 1, whiteSpace: "nowrap", color: "#e6eef5", fontWeight: 500, display: open ? 'inherit' : 'none', transition: 'all 0.3s linear', }}>
                            AI Evaluation App
                        </Typography>
                    </Link>

                    <MenuIcon sx={{ display: open ? "none" : "block", color: "#e6eef5", fontSize: 28, cursor: "pointer" }} onClick={handleClickOpen} />
                    <MenuOpenIcon sx={{ display: open ? 'inherit' : 'none', color: "#e6eef5", fontSize: 28, cursor: "pointer" }} onClick={handleClickClose} />
                </Stack>

                <List
                    sx={{
                        p: 1, borderTop: '1px solid #2e3847', borderBottom: '1px solid #2e3847',
                        '& .MuiTypography-root': {
                            display: open ? 'block' : 'none',
                            transition: 'all 0.3s linear',
                        },
                        '& .MuiListItemIcon-root': {
                            minWidth: open ? 40 : 0,
                            transition: 'all 0.3s linear',
                        },

                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton
                        component={Link}
                        to={"/admin/problems"}
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon sx={{ color: "#e6eef5" }}>
                            <QuizIcon />
                        </ListItemIcon>
                        <ListItemText primary="Problems" />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/admin/users"}
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon sx={{ color: "#e6eef5" }}>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/admin/group"}
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon sx={{ color: "#e6eef5" }}>
                            <WebAssetIcon />
                        </ListItemIcon>
                        <ListItemText primary="Group" />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/admin/subgroup"}
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon sx={{ color: "#e6eef5" }}>
                            <DynamicFeedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Subroup" />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/admin/submission"}
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <ListItemIcon sx={{ color: "#e6eef5" }}>
                            <CheckBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Submission" />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/admin/datasets"}
                        selected={selectedIndex === 6}
                        onClick={(event) => handleListItemClick(event, 6)}
                    >
                        <ListItemIcon sx={{ color: "#e6eef5" }}>
                            <DatasetLinkedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Datasets" />
                    </ListItemButton>

                    {isSuperAdmin() && (
                        <ListItemButton
                            component={Link}
                            to={"/admin/admins"}
                            selected={selectedIndex === 5}
                            onClick={(event) => handleListItemClick(event, 5)}
                        >
                            <ListItemIcon sx={{ color: "#e6eef5" }}>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admin" sx={{
                                display: open ? 'inherit' : 'none', '& .MuiTypography-root': {
                                    transition: 'all 0.3s linear',
                                }
                            }} />
                        </ListItemButton>
                    )}

                </List>
            </SidebarBox>
        </Stack>
    )
}

export default AdminSidebar