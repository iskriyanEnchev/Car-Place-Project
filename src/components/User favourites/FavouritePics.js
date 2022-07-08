import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useSelector} from 'react-redux'
import FavvNavBar from './FavouriteNavBar';
import { useState, useEffect } from 'react';

const theme = createTheme();

function FavouritePics(){
  const {user} = useSelector((state) => state.user);
  
  const [pictures, setPictures] = useState([]);

  useEffect(async () => {
    const resp = await fetch('http://localhost:5050/api/users/register')
    const users = await resp.json();
    const favPics = users.find(item => item._id === user._id).favouritesPics
    setPictures(favPics)
  }, [])
 

  const deleteFromFavv = async (picture) => {
    const resp = await fetch('http://localhost:5050/api/users/register');
    const users = await resp.json();
    const favPics = users.find(item => item._id === user._id).favouritesPics
    const idx = favPics.findIndex(item => item._id === picture._id)
    favPics.splice(idx, 1)
    console.log('+++',favPics)
    fetch(`http://localhost:5050/api/users/register/${user._id}`,{
     headers:{
         'Content-Type': 'application/json'
     },
     method: 'PUT',
     body: JSON.stringify({
       "favouritesPics": favPics

     })
   }).then(res => res.json())
   .then(data => console.log(data))
 alert("Succesfully deleted!")
 setPictures(favPics)
  };

  return (
    <ThemeProvider  theme= {theme}>
      <CssBaseline />
      <FavvNavBar/>
      
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
             My favourites pictures
            </Typography>
          </Container>
          </Box>
        {pictures.map((picture) => {
            const nameOfPic = picture.img_name
            const shortDesc = picture.short_description
            const imgLink = picture.image_link
              return ( 
        <Container sx={{  bgcolor: 'primary.main', py: 3, mb:10 }} maxWidth="md">   
          <Grid container spacing={4}>             
              <Grid item key={picture} >
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      
                      pt: '1%',
                    }}
                    image={imgLink}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {nameOfPic}
                    </Typography>
                    <Typography>
                    {shortDesc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                <Button  size="small" onClick={() => deleteFromFavv(picture)} variant="contained">Delete from favourite</Button>
                  </CardActions>
                </Card>
              </Grid>
          </Grid>
        </Container>
         )})}
      </main>

      <Box sx={{  bgcolor: 'primary.main', p: 6, mt:37.2 }} component="footer">
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
export default FavouritePics