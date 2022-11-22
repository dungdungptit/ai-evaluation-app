import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, styled, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo_ptit.png';
import { authSelector, loginAsync } from '../../store/reducers/authSlice';

const LoginForm = () => {

  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const [values, setValues] = useState({
    username: '',
    password: '',
    resMessage: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = values;
    dispatch(loginAsync({ username, password }))
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setValues({ ...values, resMessage: 'Login failed!' });
        console.log(auth);
      })
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
            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: "400px"
            },
            py: {
              xs: 2,
              md: 4
            },
            px: {
              xs: 2,
              md: 5
            },
            backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1, mb: 2 }}>
            <img src={logo} alt="logo" width="60px" />
            <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
              Login
            </Typography>
            {values.resMessage && (
              <Typography variant="h6" component="h1" fontWeight='bold' gutterBottom >
                {values.resMessage}
              </Typography>
            )}
          </Box>
          <Stack spacing={3}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="input-with-icon-adornment">
                Username
              </InputLabel>
              <OutlinedInput
                id="input-with-icon-adornment"
                defaultValue={values.username}
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
                defaultValue={values.password}
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

            <FormControlLabel control={<Checkbox sx={{ pl: 0 }} />} label="Remember me" />

            <Button type='submit' variant="contained">Submit</Button>

            {/* Don't have account, go to register and Forgot password */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              Don't have account? <Link href="/register">Register</Link>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              Forgot password? <Link href="/forgot-password">Reset</Link>

            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm