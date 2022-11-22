import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo_ptit.png';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../../store/reducers/authSlice';


const RegisterForm = () => {

    const [values, setValues] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        resMessage: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(values);
        const user = {
            username: values.username,
            password: values.password,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
        }

        if (values.username !== '' && values.password !== '' && values.email !== '' && values.firstName !== '' && values.lastName !== '') {
            dispatch(registerAsync(user))
                .then(() => {
                    navigate('/login');
                })
                .catch(() => {
                    setValues({ ...values, resMessage: 'Register failed!' });
                })
        }
    }

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container maxWidth="lg" sx={{
            px: { xs: 0, sm: 0 },
        }}>
            <Box component={Paper} sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box component={"form"} onSubmit={handleSubmit} autoComplete="off" noValidate
                    sx={{
                        width: "100%", maxWidth: {
                            xs: "100%",
                            sm: "100%",
                            md: "400px"
                        }, py: {
                            xs: 2,
                            md: 4
                        }, px: {
                            xs: 2,
                            md: 5
                        }, backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                    }}>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1, mb: 2 }}>
                        <img src={logo} alt="logo" width="60px" />
                        <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                            Register
                        </Typography>
                    </Box>
                    <Stack spacing={3}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-username">
                                Username
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username"
                                value={values.username}
                                onChange={handleChange('username')}
                                label="Username"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        {/* Confirm password */}
                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-cfpassword">
                                Confirm password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-cfpassword"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm password"
                            />
                        </FormControl>

                        {/* Email */}
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">
                                Email
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                value={values.email}
                                onChange={handleChange('email')}
                                label="Email"
                            />
                        </FormControl>

                        {/* First name */}
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-firstname">
                                First name
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-firstname"
                                value={values.firstName}
                                onChange={handleChange('firstName')}
                                label="First name"
                            />
                        </FormControl>

                        {/* Last name */}
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-lastname">
                                Last name
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-lastname"
                                value={values.lastName}
                                onChange={handleChange('lastName')}
                                label="Last name"
                            />
                        </FormControl>

                        {/* username already */}
                        {values.resMessage && (
                            <Typography variant="h6" component="h1" fontWeight='bold' gutterBottom >
                                {values.resMessage}
                            </Typography>
                        )}

                        {/* Have account, link to login */}
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Already have an account? <Link href="/login">Login</Link>
                        </Box>

                        <Button type='submit' variant="contained">Submit</Button>

                    </Stack>
                </Box>
            </Box>
        </Container>
    )
}

export default RegisterForm