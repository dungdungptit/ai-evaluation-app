import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo_ptit.png';
import axios from 'axios';
import { base_URL } from '../../utils/constants';

const api = '/api/v1/auth/login';

const LoginForm = () => {

  const [values, setValues] = useState({
    username: '',
    password: '',
    resMessage: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = values;
    const userRes = async () => {
      const response = await axios.post(base_URL + api, {
        username,
        password
      });
      return response;
    }

    userRes().then((res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data.data));
        if (res.data.data.role.includes('admin')) {
          navigate('/admin/problems');
        } else if (res.data.data.role.includes('superadmin')) {
          navigate('/admin/problems');
        }
        else if (res.data.data.role.includes('user')) {
          navigate('/problems');
        }
      }
    }).catch((err) => {
      // console.log(err);
      setValues({ ...values, resMessage: err.response.data.resMessage });
      console.log(values.resMessage);

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