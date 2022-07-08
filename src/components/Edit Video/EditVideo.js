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
import {Link,  useNavigate, useLocation  } from 'react-router-dom'
import {useSelector} from 'react-redux'





const theme = createTheme();

function EditVideo() {
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {state} = useLocation();
  const  _id = state._id;
  const  vidLink = state.video_link;
  const name = state.video_name
  const shortDescription = state.short_description

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const nameOfVideo = data.get('nameOfVideo')
    const shortDesc = data.get('ShortDescriptionOfVideo')
    const videoLink = data.get('videoLink')

    fetch(`http://localhost:5050/api/videos/${_id}`,{
                headers:{
                    'Content-Type': 'application/json'
                },
                method: 'PUt',
                body: JSON.stringify({
                  video_name : nameOfVideo ||name,
                  short_description: shortDesc || shortDescription,
                  video_link: videoLink || vidLink,
                  
                })
              })
              if(event === null){
                alert("Unsuccesfully edit video!")
                return ;
              }
            alert("Succesfully edit video!")
              navigate('/videos')
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
            Edit Video
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="nameOfVideo"
                  required
                  fullWidth
                  defaultValue={name}
                  id="nameOfVideo"
                  label="Name of video"
                  color="primary"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  maxRows={4}
                  defaultValue={shortDescription}
                  name="ShortDescriptionOfVideo"
                  label="Short description of video"
                  type="ShortDescriptionOfVideo"
                  id="ShortDescriptionOfVideo"
                  autoComplete="ShortDescriptionOfVideo"
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="videoLink"
                  required
                  fullWidth
                  defaultValue={vidLink}
                  id="videoLink"
                  label="YouTube video link only"
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
              Edit video
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12} sx={{ mt: 2}}>
              <Button variant="contained"><Link to="/videos">
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

export default EditVideo