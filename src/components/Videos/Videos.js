import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import 'video-react/dist/video-react.css'; 
import {Link, useNavigate} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import NavBar from '../Navigation Bar/Nav';
import { grey } from '@mui/material/colors';
import {useSelector} from 'react-redux'
import GuestNavBar from '../Guest Home/GuestNavBar';

const color = grey[900];



const theme = createTheme();

function Videos(){
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
  
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  console.log(inputText)
  

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/videos`)
        .then(res => res.json())
        .then(
          (result) => {
            setVideos(result);
          })
  }, [])

  const addToFavv = async (video) => {
    const resp = await fetch('http://localhost:5050/api/users/register');
     const users = await resp.json();
     const favVideos = users.find(item => item._id === user._id).favouritesVideos
     if(favVideos.find(item => item._id === video._id)){
      alert("Already added!")
      return
    }
    favVideos.push(video)
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
  alert("Succesfully added!")
}

const editVideo = (video) => {
  navigate('/edit-video', { state: video });
  
};
const deleteVideo = (_id) => {
    
  fetch(`http://localhost:5050/api/videos/${_id}`,{
   
   method: 'DELETE',

 }).then(res => res.json())
 .then(data => console.log(data))
alert("Succesfully deleted!")
fetch(`http://localhost:5050/api/videos`)
      .then(res => res.json())
      .then(
        (result) => {
          setVideos(result);
        })
};
  
  const videosToShow = inputText.length > 2 ? videos.filter(item => item.video_name.toLowerCase().includes(inputText)) : videos
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     {user ? <NavBar/> : <GuestNavBar/> }
 
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
             Videos of cars
            </Typography>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {user ? <Button variant="contained"><Link to="/add-video">
                  {"Add video"}
                </Link></Button> : null}
            </Stack>
          </Container>
          {user ? 
          <TextField sx={{mt: 3}} size="small" id="outlined-basic" label="Search video" color="primary" variant="outlined" onChange={inputHandler}/>
            : null}
          </Box>
          
          {videosToShow.map((video) => {
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
                  {user ? <Button sx={{bgcolor: color}} size="small" onClick={() => addToFavv(video)} variant="contained">Add to favourite</Button> : null}
                  {user?.isAdmin ? <Button sx={{bgcolor: color}}  onClick={() => deleteVideo(video._id)} size="small"  variant="contained">Delete </Button> : null }
                  {user?.isAdmin ? <Button  sx={{bgcolor: color}} onClick={() => editVideo(video)} size="small"  variant="contained">Edit </Button> : null }
                  </CardActions>
                </Card> 
              </Grid>
              )})}
   
        
        

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

export default Videos