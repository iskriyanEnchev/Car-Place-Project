import React  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch} from 'react-redux'
import {loginSuccess} from '../../store/login/login-actions'
import bcrypt from 'bcryptjs/dist/bcrypt';




const theme = createTheme();


function SignIn() {
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {

   
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   const username = data.get('username')
    const  password = data.get('password')
    
    const resp = await fetch('http://localhost:5050/api/users/register');
    const users = await resp.json();
    const enteredUser = users.find(user => user.username === username)
    const isPasswordMatch = await bcrypt.compare(password, enteredUser.password);
    const loggedUser = users?.find(user => user.username === username 
      && isPasswordMatch)

      if(loggedUser){
        
        event.preventDefault();
        
        dispatch(loginSuccess(loggedUser))
        window.history.pushState({}, "", "/user-home")
          const register = new PopStateEvent('popstate');
    window.dispatchEvent(register);
      }
      else{
        alert("Wrong username or password")
        event.preventDefault();
        window.history.pushState({}, "", "/login")
          const popState = new PopStateEvent('popstate');
    window.dispatchEvent(popState);
      }

  }

  return (

    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)',
            backgroundRepeat: 'no-repeat',
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
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                color="primary"
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
                color="primary"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, bgcolor: 'primary.main'}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Button variant="contained"><Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link></Button>
                </Grid>
                <Grid item sx={{ ml: 10}}>
                  <Button variant="contained"><Link to="/">
                  {"Go to Home"}
                </Link></Button>
                </Grid>
              </Grid>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn
