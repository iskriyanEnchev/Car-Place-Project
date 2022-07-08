import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'






const theme = createTheme();

function AddDiscussion() {
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();

 

  const [shortDesc, setShortDesc] = React.useState('');

  const shortDescription = (event) => {
    setShortDesc(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const discussionName = data.get('discussionName')
    const shortDesc = data.get('ShortDescription')
    
    

    fetch('http://localhost:5050/api/discussions',{
                headers:{
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                  discussion_name: discussionName,
                  short_description: shortDesc,
                })
              })
              if(event === null){
                alert("Unsuccesfully added discussion!")
                return ;
              }
              
            alert("Succesfully added discussion!")
              navigate('/blog')
  };

  if(!user){
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <DirectionsCarIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Discussion
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="discussionName"
                  required
                  fullWidth
                  id="discussionName"
                  label="Discussion Name"
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  maxRows={4}
                  value={shortDesc}
                  onChange={shortDescription}
                  name="ShortDescription"
                  label="Short Description"
                  type="ShortDescription"
                  id="shortDescription"
                  autoComplete="ShortDescription"
                  color="primary"
                />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.main'}}
            >
              Add discussion
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12} sx={{ mt: 2}}>
              <Button variant="contained"><Link to="/blog">
                  {"Go Back"}
                </Link></Button>
              </Grid>
              </Grid>
          </Box>
        </Box>
        

      </Container>
    </ThemeProvider>
  );
}
  export default AddDiscussion