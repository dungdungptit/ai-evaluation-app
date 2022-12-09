import { React, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

// @mui/material
import { Typography, Paper, Box, TextField, Button, Breadcrumbs, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addNewAdminAsync } from '../../../store/reducers/adminSlice';
import { BoxContainer } from '../../../components/Box/BoxContainer';


const AdminNew = () => {
    // state = "new" or "edit"
    const [admin, setAdmin] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
        }
    );

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const name = event.target.name;
        setAdmin({
            ...admin,
            [name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit");
        const newAdmin = {
            username: admin.username,
            email: admin.email,
            password: admin.password,
            firstName: admin.firstName,
            lastName: admin.lastName,
        }
        dispatch(addNewAdminAsync(newAdmin));
        navigate('/admin/admins');
    };

    return (
        <BoxContainer>

            <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom
                sx={{ mt: 2, mb: 3, }}
            >
                Admins Details
                <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                    <Link underline="hover" color="inherit" href="">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/admin/admins">
                        Admins
                    </Link>
                    <Typography color="text.primary">
                        Edit Admin
                    </Typography>
                </Breadcrumbs>
            </Typography>
            {/* form */}
            <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, p: 3 }} component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: '100%', mb: 2 }}
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={admin.email}
                    name="email"
                    onChange={handleChange}
                />
                <TextField
                    sx={{ width: '100%', mb: 2 }}
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={admin.username}
                    name="username"
                    onChange={handleChange}
                />
                <TextField
                    sx={{ width: '100%', mb: 2 }}
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={admin.password}
                    name="password"
                    onChange={handleChange}
                />
                <TextField
                    sx={{ width: '100%', mb: 2 }}
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    value={admin.firstName}
                    name="firstName"
                    onChange={handleChange}
                />
                <TextField
                    sx={{ width: '100%', mb: 2 }}
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={admin.lastName}
                    name="lastName"
                    onChange={handleChange}
                />

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
                    <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/admin/admins')}>Cancel</Button>
                    <Button variant="contained" type="submit" sx={{ ml: 2 }}>Submit</Button>
                </Box>
            </Paper>
            {/* end form */}

        </BoxContainer >
    )
}

AdminNew.propTypes = {
    AdminItem: PropTypes.object,
    rơwsData: PropTypes.array,
};

export default AdminNew

