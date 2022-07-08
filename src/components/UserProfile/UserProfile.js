import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import {useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'





const theme = createTheme();

function YourProfile() {
  
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/users/register`)
        .then(res => res.json())
        .then(
          (result) => {
            setUsers(result);
          })
  }, [])
  const updatedUser = users.find(item => item._id === user._id)
  const editProfile = (user) => {
    navigate('/edit-profile', { state: user});
    
  };
  const editPassword = (user) => {
    navigate('/edit-password', { state: user});
    
  };
  if(!user){
    return null;
  }
  
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

          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} src="/static/images/avatar/2.jpg" />

          <Typography component="h1" variant="h5">
            Your Profile
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
               
                <Typography>Name: {updatedUser?.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                
                <Typography>Username: {updatedUser?.username}</Typography>
              </Grid>
              <Grid item xs={12}>
                
                <Typography>Password: *******</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
              <Avatar sx={{m: 3, bgcolor: 'primary.main' }}>
            <WcRoundedIcon />
          </Avatar> 
              </Grid>
              <Grid item xs={12} sm={1}>
                
                  <Typography>Gender: {updatedUser?.gender}</Typography>
              </Grid>
            </Grid>
            <Button 
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
              onClick={() => editProfile(updatedUser)}
            >
              Edit profile
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Grid item sx={{ mr:7,mt: 2}}>
                <Button variant="contained" onClick={() => navigate('/user-home')}>
                  {"Go Back"}
                  </Button>
                  <Button sx={{ ml:2}}variant="contained" onClick={() => editPassword(updatedUser)}>
                  {"Edit password"}
                  </Button>
              </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}

export default YourProfile
