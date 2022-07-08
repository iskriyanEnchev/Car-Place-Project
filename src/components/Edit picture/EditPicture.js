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
import {Link, useNavigate, useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'




const theme = createTheme();

function EditPicture() {
  const {user} = useSelector((state) => state.user);
  const {state} = useLocation();
  const  _id = state._id;
  const  imgLink = state.image_link;
  const name = state.img_name
  const shortDescription = state.short_description
  
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const nameOfPic = data.get('nameOfPicture')
    const shortDesc = data.get('ShortDescriptionOfPicture')
    const imageLink = data.get('imageLink')

    fetch(`http://localhost:5050/api/pictures/${_id}`,{
                headers:{
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                  img_name : nameOfPic || name,
                  short_description: shortDesc || shortDescription,
                  image_link: imgLink || imageLink,
                  
                })
              })
              if(event === null){
                alert("Unsuccesfully edit picture!")
                return ;
              }
            alert("Succesfully edit picture!")
              navigate('/pictures')
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
            Edit Picture
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="nameOfPicture"
                  defaultValue={name}
                  required
                  fullWidth
                  id="nameOfPicture"
                  label="Name of picture"
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
                  name="ShortDescriptionOfPicture"
                  label="Short description of picture"
                  type="ShortDescriptionOfPicture"
                  id="ShortDescriptionOfPicture"
                  autoComplete="ShortDescriptionOfPicture"
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="imageLink"
                  required
                  fullWidth
                  defaultValue={imgLink}
                  id="imageLink"
                  label="Image link"
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
              Edit picture
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12} sx={{ mt: 2}}>
              <Button variant="contained"><Link to="/pictures">
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
export default EditPicture