import React from 'react'
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import AdminSidebar from './AdminSidebar';

const APP_BAR_MOBILE = 24;
const APP_BAR_DESKTOP = 32;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
    flexDirection: 'column',
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100vh',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    backgroundColor: "#f6f9fc",
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));

const AdminMainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100vh',
    display: 'flex',
    // paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        // paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.down('md')]: {
        paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(4),
    }
}));

const AdminMainContainer = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    display: 'flex',
}));

const Layout = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <RootStyle>
            {!!user && user.role.includes('admin') ? <AdminNavbar /> : <Navbar />}
            {(!!user && user.role.includes('admin'))
                ?
                <AdminMainContainer>
                    <AdminSidebar />
                    <AdminMainStyle>
                        <Outlet />
                    </AdminMainStyle>
                </AdminMainContainer>
                :
                <MainStyle>
                    <Outlet />
                </MainStyle>
            }
        </RootStyle>
    )
}

export default Layout