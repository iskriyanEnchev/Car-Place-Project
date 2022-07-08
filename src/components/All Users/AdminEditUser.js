import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation} from 'react-router-dom';


const theme = createTheme();

function AdminEditUser() {
    const navigate = useNavigate();
 const {user} = useSelector((state) => state.user);

 const {state} = useLocation();
 const  _id = state._id;
 const currName = state.name;
 const currUsername = state.username;
 const currGender = state.gender
  const [gender, setGender] = React.useState('');

    const handleGender = (event) => {
      setGender(event.target.value);
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name') 
    const username = data.get('username')
 
    console.log('+++',data)
    if(event=== null)
    {
        alert("Unsuccesfull edited!Need to input all Text fields!")
        return
    }
    fetch(`http://localhost:5050/api/users/register/${_id}`,{
                headers:{
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    name: name || currName, 
                    username: username || currUsername,
                    gender: gender || currGender,
                })
              }).then(res => res.json())
              .then(data => console.log(data))
            alert("Succesfully edited!")
              navigate('/all-users')
  };
   
  if(!user?.isAdmin){
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
            <EditIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  id="name"
                  defaultValue={currName}
                  label="Name"
                  autoFocus
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="Username"
                  label="Uasername"
                  defaultValue={currUsername}
                  name="username"
                  autoComplete="Username"
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
                    defaultValue={currGender}
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
              Save changes
            </Button>
            <Button onClick={() => navigate('/all-users')} variant="contained">
                  {"Go Back"}</Button>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}

export default AdminEditUser