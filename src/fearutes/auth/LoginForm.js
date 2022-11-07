import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo_ptit.png';

const LoginForm = () => {

  const [values, setValues] = useState({
    username: '',
    password: '',
    error: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(values);
    const userRes = {
      username: "B19DCCN120",
      roles: ['admin'],
      // roles: ['user'],
      error: false,
    };

    if (values.username === userRes.username) {
      setValues({
        username: '',
        password: '',
        error: false,
      });
      setShowPassword(false);
      localStorage.setItem('user', JSON.stringify(userRes));

      if (userRes.roles.includes('admin')) {
        navigate('/admin');
      } else if (userRes.roles.includes('user')) {
        navigate('/problems');
      }
      // navigate('/problems', { state: userRes });
    } else {
      setValues({
        ...values,
        error: true,
      });
      setShowPassword(false);
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
        <Box component={"form"} onSubmit={handleSubmit} sx={{
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
              Login
            </Typography>
            {values.error && (
              <Typography variant="h6" component="h1" fontWeight='bold' gutterBottom >
                Login failed
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControlLabel control={<Checkbox sx={{ pl: 0 }} />} label="Remember me" />

            <Button type='submit' variant="contained">Submit</Button>

            <Typography variant="body2" component="a" href='/' sx={{ textAlign: "center", textDecoration: "none", color: "text.primary" }}>
              Forgot password?
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm