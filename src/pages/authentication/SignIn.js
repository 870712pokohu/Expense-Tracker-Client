import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginLogo from '../../global/mymind-XUlsF9LYeVk-unsplash.jpg'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import validator from 'validator'
import Alert from '@mui/material/Alert';
import { Divider, IconButton } from '@mui/material';
import appleLogo from '../../global/apple.png'
import facebookLogo from '../../global/facebook.png'
import googleLogo from '../../global/google.png'
import brandLogo from '../../global/budgeting.png'
import useLogin from '../../hooks/useLogin';
import Navbar from '../../components/Navbar';




const defaultTheme = createTheme();

export default function SignIn() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {login, errorMessage} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {userName, password};
    const isLogin = await login(user);
    if(isLogin){
      const user = JSON.parse(localStorage.getItem('user'));
      const accessToken = user.accessToken;
      if(accessToken){
        navigate('/homePage');
      }else{
  
      }
    }
   
        // // redirect to the homepage or to the PlaidAPI if the user has not connected yet
        // if (message.accessToken === 'false') {
        //   navigate('/plaidAPI', {
        //     state: {
        //       email: message.email,
        //       userName: message.name
        //     }
        //   })
        // } else {
        //   navigate('/homePage', {
        //     state: {
        //       email: message.email,
        //       userName: message.name
        //     }
        //   })
        // }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar/>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginLogo})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar 
              sx={{ m: 1 }}
              src={brandLogo}
            >
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e)=>setUserName(e.target.value)}
                value = {userName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {errorMessage && 
                <Alert severity='error' sx={{mt:2}} >
                  {errorMessage}
                </Alert> 
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Divider>or</Divider>
              <Grid container spacing={2} sx={{mt:1, mb:3}}>
                <Grid 
                  item 
                  display="flex"
                  justifyContent="center" alignItems="center"
                  xs={4}
                >
                  <IconButton>
                    <Avatar 
                      src={appleLogo}
                      sx={{ width: 30, height: 30 }}
                    />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  display="flex"
                  justifyContent="center" alignItems="center"
                  xs={4}
                >
                  <IconButton>
                    <Avatar
                      src={googleLogo}
                      sx={{ width: 30, height: 30 }}
                    />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  display="flex"
                  justifyContent="center" alignItems="center"
                  xs={4}
                >
                  <IconButton>
                    <Avatar
                      src={facebookLogo}
                      sx={{ width: 30, height: 30 }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}