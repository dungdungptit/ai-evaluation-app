import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, styled, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ButtonDefault } from '../../components/Button/ButtonDefault';
import { authSelector, loginAsync } from '../../store/reducers/authSlice';
import { logo } from '../../utils/constants';

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
      .then((res) => {
        // window.location.reload();
        console.log(res);
        if(res.type === 'auth/login/fulfilled') {
          window.location.reload();
        }
      })
      .catch(() => {
        setValues({ ...values, resMessage: 'Username or password is incorrect' });
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
    <Box sx={{
      height: '100vh',
      width: '100vw',
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
            Sign in to AI Evaluation
          </Typography>
          <Typography variant='body1' sx={{ fontWeight: 400, width: "100%", color: '#000', textAlign: 'center', fontSize: "1rem" }}>
            New user?
            <Link href="/register" underline="hover" sx={{ color: '#000', fontWeight: 600, ml: 1 }}>
              Create an account
            </Link>
          </Typography>
        </Box>
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

        <FormGroup sx={{my: "8px !important"}}>
          <FormControlLabel control={<Checkbox />} label="Remember me" />
        </FormGroup>

        {values?.resMessage && (
          <Typography variant='body1' sx={{ fontWeight: 400, width: "100%", color: '#f44336', textAlign: 'center', fontSize: "1rem", m:"0px !important",  mb: "16px !important" }}>
            {values?.resMessage}
          </Typography>
        )}
        <ButtonDefault type='submit' variant="contained">Submit</ButtonDefault>

        {/* Don't have account, go to register and Forgot password */}
        <Typography variant='body1' sx={{ fontWeight: 400, width: "100%", color: '#000', textAlign: 'center', fontSize: "1rem" }}>
          Forgot password?
          <Link href="/forgot-password" underline="hover" sx={{ color: '#000', fontWeight: 600, ml: 1 }}>
            Reset
          </Link>
        </Typography>
      </Stack>

    </Box>
  )
}

export default LoginForm