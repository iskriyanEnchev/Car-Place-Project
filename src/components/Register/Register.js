import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




const theme = createTheme();

export default function SignUp() {
  const [gender, setGender] = React.useState('');

    const handleGender = (event) => {
      setGender(event.target.value);
    };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name')
    const username = data.get('username')
    const password = data.get('password')
    const isAdmin = 'false'
    const resp = await fetch('http://localhost:5050/api/users/register');
    const users = await resp.json();
    const Users = users.find(user => user.username === username)
    if(Users){
      alert("Username already exist!")
    return;
    }
    fetch('http://localhost:5050/api/users/register',{
                headers:{
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                  name,
                  username,
                  password,
                  gender,
                  isAdmin
                })
              }).then(res => res.json())
              .then(data => console.log(data))
              event.preventDefault();
        window.history.pushState({}, "", "/login")
          const login = new PopStateEvent('popstate');
    window.dispatchEvent(login);
  };
  
  
  return (
    <ThemeProvider  theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Username"
                  label="Uasername"
                  name="username"
                  autoComplete="Username"
                  color="primary"
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
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
              <Avatar sx={{m: 3, bgcolor: 'primary.main' }}>
            <WcRoundedIcon />
          </Avatar> 
              </Grid>
              <Grid item xs={12} sm={1}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="Gender" color="primary">Gender</InputLabel>
                  <Select
                    labelId="Gender"
                    id="gender"
                    value={gender}
                    onChange={handleGender}
                    color="primary"
                    label="Gender">
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>
                  </FormControl>
              </Grid>
           
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
              
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Grid item sx={{ mt: 2}}>
                <Button variant="contained"><Link to="/login">
                  {"Already have an account? Sign in"}
                </Link></Button>
                </Grid>
                <Grid item sx={{ ml: 10, mt: 1}}>
                  <Button variant="contained"><Link to="/">
                  {"Go to Home"}
                </Link></Button>
              </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}