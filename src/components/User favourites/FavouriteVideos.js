import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import 'video-react/dist/video-react.css'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {useSelector} from 'react-redux'
import FavvNavBar from './FavouriteNavBar';
import { useState, useEffect } from 'react';

const color = grey[900];



const theme = createTheme();

function FavouritesVideos(){
  const {user} = useSelector((state) => state.user);
 
  
  const [videos, setVideos] = useState([]);

  useEffect(async () => {
    const resp = await fetch('http://localhost:5050/api/users/register')
    const users = await resp.json();
    const favVideos = users.find(item => item._id === user._id).favouritesVideos
    setVideos(favVideos)
  }, [])

  const deleteFromFavv = async (video) => {
    const resp = await fetch('http://localhost:5050/api/users/register');
    const users = await resp.json();
    const favVideos = users.find(item => item._id === user._id).favouritesVideos
    const idx = favVideos.findIndex(item => item._id === video._id)
    favVideos.splice(idx, 1)
    console.log('+++',favVideos)
    fetch(`http://localhost:5050/api/users/register/${user._id}`,{
     headers:{
         'Content-Type': 'application/json'
     },
     method: 'PUT',
     body: JSON.stringify({
       "favouritesVideos": favVideos

     })
   }).then(res => res.json())
   .then(data => console.log(data))
 alert("Succesfully deleted!")
 setVideos(favVideos)
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FavvNavBar/>
 
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
            My favourites videos
            </Typography>
          </Container>
          </Box>
          
          {videos.map((video) => {
            const nameOfVideo = video.video_name
            const shortDesc = video.short_description
            const addedVideoLink = video.video_link
            const sep = '='
            const embededVideo = addedVideoLink.toString().split(sep)
            const realLink = `https://www.youtube.com/embed/${embededVideo[1]}`
              return ( 
          <Grid  item key={video} sx={{bgcolor: 'primary.main', py: 3, ml:37, mb: 10, width: 1000 }} >
          
                <Card 
                sx={{ bgcolor: color, height: '100%', display: 'inline', flexDirection: 'column' }}
                >
                     <iframe 
                     width="980" 
                     height="551" 
                     src={realLink}
                     title="YouTube video player" 
                     frameBorder="1" 
                     allow="accelerometer; 
                     autoplay; 
                     clipboard-write; 
                     encrypted-media; 
                     gyroscope; 
                     picture-in-picture" 
                     allowFullScreen>
                     </iframe>
                  <CardContent sx={{flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {nameOfVideo}
                    </Typography>
                    <Typography>
                      {shortDesc}
                    </Typography>
                  </CardContent>
                  <CardActions style={{justifyContent: 'center'}}>
                  <Button sx={{bgcolor: color}} size="small" onClick={() => deleteFromFavv(video)} variant="contained">Delete from favourite</Button>
                  </CardActions>
                </Card> 
              </Grid>
              )})}
   
        
        

      <Box sx={{ bgcolor: 'primary.main', p: 6, mt:37.2 }} component="footer">
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

export default FavouritesVideos