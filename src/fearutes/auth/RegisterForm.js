import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { registerAsync } from '../../store/reducers/authSlice';
import { ButtonDefault } from '../../components/Button/ButtonDefault';
import { logo } from '../../utils/constants';


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
            dispatch(registerAsync(user)).then((res) => {
                    if (res.type === 'auth/register/fulfilled') {
                        navigate('/login');
                    }
                }).catch(() => {
                    setValues({ ...values, resMessage: 'Username already exists' });
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
        <Box sx={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>

            <Stack spacing={3} component={"form"} onSubmit={handleSubmit} autoComplete="off" noValidate
                sx={{
                    width: "100%",
                    maxWidth: {
                        xs: "100%",
                        sm: "100%",
                        md: "560px",
                    },
                    height: "auto",
                    boxSizing: 'border-box',
                    margin: "0 auto",
                    p: { xs: "48px 12px", md: "48px 64px", },
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    // boxShadow: 2,
                    border: {
                        md: "1px solid #e0e0e0",
                    },
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1, mb: 2 }}>
                    <img src={logo} alt="logo" width="60px" />
                    <Typography variant='h4' sx={{ fontWeight: 600, width: "100%", color: '#000', textAlign: 'center', fontSize: "1.5rem", mt: 2 }}>
                        Sign up to AI Evaluation
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: 400, width: "100%", color: '#000', textAlign: 'center', fontSize: "1rem" }}>
                        Have an account?
                        <Link href="/login" underline="hover" sx={{ color: '#000', fontWeight: 600, ml: 1 }}>
                            Go to sign in
                        </Link>
                    </Typography>

                </Box>
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
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
                    <OutlinedInput sx={{ mb: 2 }}
                        id="outlined-adornment-lastname"
                        value={values.lastName}
                        onChange={handleChange('lastName')}
                        label="Last name"
                    />
                </FormControl>

                {/* username already */}
                {values?.resMessage && (
                    <Typography variant='body1' sx={{ fontWeight: 400, width: "100%", color: '#f44336', textAlign: 'center', fontSize: "1rem", m: "0px !important", mb: "16px !important" }}>
                        {values?.resMessage}
                    </Typography>
                )}

                {/* Have account, link to login */}

                <ButtonDefault type='submit' variant="contained">Submit</ButtonDefault>

            </Stack>


        </Box>
    )
}

export default RegisterForm