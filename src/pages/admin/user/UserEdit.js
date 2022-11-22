import { React, Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types'

// @mui/material
import { Typography, Paper, Box, TextField, Button, Breadcrumbs, Link } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getUserByIdAsync, userSelector, updateUserAsync } from '../../../store/reducers/userSlice';



const UserItemEdit = ({ state }) => {
    // state = "new" or "edit"
    const [user, setUser] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    );

    const navigate = useNavigate();
    const params = useParams();
    const userId = params.id;

    const dispatch = useDispatch();
    const userItem = useSelector(userSelector);
    console.log(userItem);


    useEffect(() => {
        dispatch(getUserByIdAsync(userId)).then((res) => {
            setUser(res.payload.data);
        });
    }, [dispatch, userId])


    const handleChange = (event) => {
        const name = event.target.name;
        setUser({
            ...user,
            [name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit");
        const newUser = {
            id: userId,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
        }
        dispatch(updateUserAsync(newUser));
        navigate('/admin/users');
    };

    return (
        <Fragment>
            <Box sx={{
                height: "auto",
                minWidth: { xs: 300, sm: 600, md: 900 }, px: { xs: 0, md: 3 },
                flexGrow: 1,
            }} >
                <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom
                    sx={{ mt: 2, mb: 3, }}
                >
                    Users Details
                    <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                        <Link underline="hover" color="inherit" href="">
                            Home
                        </Link>
                        <Link underline="hover" color="inherit" href="/admin/users">
                            Users
                        </Link>
                        <Typography color="text.primary">
                            Edit User
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
                        value={user.email}
                        name="email"
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ width: '100%', mb: 2 }}
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={user.password}
                        name="password"
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ width: '100%', mb: 2 }}
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        value={user.firstName}
                        name="firstName"
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ width: '100%', mb: 2 }}
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        value={user.lastName}
                        name="lastName"
                        onChange={handleChange}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
                        <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/admin/users')}>Cancel</Button>
                        <Button variant="contained" type="submit" sx={{ ml: 2 }}>Submit</Button>
                    </Box>
                </Paper>
                {/* end form */}
            </Box>
        </Fragment >
    )
}

UserItemEdit.propTypes = {
    UserItem: PropTypes.object,
    rơwsData: PropTypes.array,
};

export default UserItemEdit

