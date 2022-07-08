import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import NavBar from '../Navigation Bar/Nav';
import {useSelector} from 'react-redux'


const theme = createTheme();

function AllUsers(){
  const {user} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
  
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  console.log(inputText)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/users/register`)
        .then(res => res.json())
        .then(
          (result) => {
            setUsers(result);
          })
  }, [])
  const deleteUser = (_id) => {
    
    fetch(`http://localhost:5050/api/users/register/${_id}`,{
     
     method: 'DELETE',

   }).then(res => res.json())
   .then(data => console.log(data))
 alert("Succesfully deleted!")
 fetch(`http://localhost:5050/api/users/register`)
        .then(res => res.json())
        .then(
          (result) => {
            setUsers(result);
          })
  };

 const editUser = (user) =>{
     navigate('/admin-edit-user', { state: user })
 }
 const editPassUser = (user) =>{
  navigate('/admin-edit-user-password', { state: user })
}
    

  const usersToShow = inputText.length > 2 ? users.filter(item => item.username.toLowerCase().includes(inputText)) : users
  if(!user?.isAdmin){
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     <NavBar/>
      
      <main>
  
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              letterSpacing={2}
            >
             All Users
            </Typography>
          </Container>
          <TextField sx={{mt: 3}} size="small" id="outlined-basic" label="Search article" color="primary" variant="outlined" onChange={inputHandler} />
        </Box>
        {usersToShow.map((user) => {
            const userID= user._id
            const userName = user.name
            const userUsername = user.username
            const userGender = user.gender
            const isAdmin = user.isAdmin || 'false'

              return ( 
        <Container sx={{bgcolor: 'primary.main', mt: 3,mb: 3, py: 3}} alignItems="center" maxWidth="md">
          <Grid container spacing={3}>             
              <Grid item key={user._id.toString()}>
                <Card 
                sx={{height: '100%', width:855, display: 'flex', flexDirection: 'column' }} >
            
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                     User ID
                     <Typography>{userID}</Typography>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      Name
                      <Typography>{userName}</Typography>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      Username
                      <Typography>{userUsername}</Typography>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      Password
                      <Typography>********</Typography>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      Gender
                      <Typography>{userGender}</Typography>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      Admin
                      <Typography>{isAdmin}</Typography>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button sx={{ bgcolor: 'primary.main' }} name="deleteThisUser" variant="contained" size="small" 
                    onClick={() => deleteUser(userID)}
                    >
                      Delete user
                    </Button>
                    <Button sx={{ bgcolor: 'primary.main' }} name="editThisUser" variant="contained" size="small" 
                    onClick={() => editUser(user)}
                    >
                      Edit user
                    </Button>
                    <Button sx={{ bgcolor: 'primary.main' }} name="editThisUser" variant="contained" size="small" 
                    onClick={() => editPassUser(user)}
                    >
                      Edit password
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
          </Grid>
        </Container>
        )})}
      </main>

      <Box sx={{ bgcolor: 'primary.main', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.main"
          component="p"
        >
          Iskriyan Enchev's final project
        </Typography>

      </Box>

    </ThemeProvider>
  );
}

export default AllUsers