import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import brandLogo from '../../global/budgeting.png'
import Swal from 'sweetalert2'
import useSignUp from '../../hooks/useSignup';


const defaultTheme = createTheme();


export default function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const {signup, errorMessage} = useSignUp();

  const handleSubmit = async (event) => {
    // prevent the form from submit
    event.preventDefault();
    const user = {name, email, password, confirmPassword};
    // use hook to do the sign up logic
    const currentState = await signup(user);
    // user is successfully create
    if(currentState){
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      let timerInterval;

      const result = await Swal.fire({
        title: 'success',
        text: 'Register completed!',
        icon: 'success',
        timer: 1500,
        didOpen: ()=>{
          Swal.showLoading();
          timerInterval = setInterval(100);
        },
        willClose: ()=>{
          clearInterval(timerInterval);
        }
      });
      
      if (result.dismiss === Swal.DismissReason.timer) {
        navigate('/plaidAPI');
      }

    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="Full Name"
                  name="userName"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </Grid>
            </Grid>
            {errorMessage &&
              <Alert severity='error' sx={{ mt: 2 }} >
                {errorMessage}
              </Alert>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}