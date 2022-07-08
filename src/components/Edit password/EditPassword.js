import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import bcrypt from 'bcryptjs/dist/bcrypt';



const theme = createTheme();

function EditPassword() {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user);
    const {state} = useLocation();
   
   
   const currPass= state.password;
   console.log('+++', currPass)
   
     const handleSubmit = async (event) => {
       event.preventDefault();
       const data = new FormData(event.currentTarget);
       const oldPassword = data.get('password-old')
       const password = data.get('password')
       const passwordRepeat = data.get('password1')
       const salt = await bcrypt.genSalt(10);
       const isPasswordMatch = await bcrypt.compare(oldPassword, currPass);
       const passwordHash = await bcrypt.hash(password, salt)
       const passwordRepeatHash = await bcrypt.hash(passwordRepeat, salt)
       console.log('+++', isPasswordMatch)
       if(passwordHash !== passwordRepeatHash)
       {
           alert("Passwords doesn't match!")
           return
       }
       else if(!isPasswordMatch)
       {
           alert("Wrong old password! ")
           return
       }
     
       if(password === null)
       {
           alert("Unsuccesfull edited!Need to input all Text fields!")
           return
       }
       fetch(`http://localhost:5050/api/users/register/${user._id}`,{
                   headers:{
                       'Content-Type': 'application/json'
                   },
                   method: 'PUT',
                   body: JSON.stringify({
                    
                     password: passwordHash,
                     
                   })
                 }).then(res => res.json())
                 .then(data => console.log(data))
               alert("Succesfully edited!")
                 navigate('/your-profile')
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password-old"
                  label="Old password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Repeat password"
                  type="password"
                  id="password"
                  autoComplete="new-password1"
                  color="primary"
                />
              </Grid>
         
           
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
              
            >
              Save changes
            </Button>
            <Button onClick={() => navigate(-1)} variant="contained">
                  {"Go Back"}</Button>
          </Box>
        </Box>
   
         </Container>
       </ThemeProvider>
     );
   }

export default EditPassword