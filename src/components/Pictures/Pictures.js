import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link, useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import NavBar from '../Navigation Bar/Nav';
import {useSelector} from 'react-redux'
import GuestNavBar from '../Guest Home/GuestNavBar';


const theme = createTheme();

function Pictures(){
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
  
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  console.log(inputText)
  
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/pictures`)
        .then(res => res.json())
        .then(
          (result) => {
            setPictures(result);
          })
  }, [])

  const addToFavv = async (picture) => {
      const resp = await fetch('http://localhost:5050/api/users/register');
     const users = await resp.json();
     const favPics = users.find(item => item._id === user._id).favouritesPics
     if(favPics.find(item => item._id === picture._id)){
      alert("Already added!")
      return
    }
     favPics.push(picture)
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
  alert("Succesfully added!")
}
const editPic = (pic) => {
  navigate('/edit-picture', { state: pic });
  
};
const deletePicture = (_id) => {
    
  fetch(`http://localhost:5050/api/pictures/${_id}`,{
   
   method: 'DELETE',

 }).then(res => res.json())
 .then(data => console.log(data))
alert("Succesfully deleted!")
fetch(`http://localhost:5050/api/pictures`)
      .then(res => res.json())
      .then(
        (result) => {
          setPictures(result);
        })
};
  
const picturesToShow = inputText.length > 2 ? pictures.filter(item => item.img_name.toLowerCase().includes(inputText)) : pictures 


  return (
    <ThemeProvider  theme= {theme}>
      <CssBaseline />
      {user ? <NavBar/> : <GuestNavBar/> }
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
             Picture of cars
            </Typography>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
             {user ? <Button variant="contained"><Link to="/add-pic">
                  {"Add picture"}
                </Link></Button> : null}
            </Stack>
          </Container>
          {user ? 
          <TextField sx={{mt: 3}} size="small" id="outlined-basic" label="Search picture" color="primary" variant="outlined" onChange={inputHandler} />
            : null}
          </Box>
        {picturesToShow.map((picture) => {
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
                  {user ?  <Button  size="small" onClick={() => addToFavv(picture)} variant="contained">Add to favourite</Button> : null}
                  {user?.isAdmin ? <Button  size="small" onClick={() => deletePicture(picture._id)} variant="contained">Delete </Button> : null }
                  {user?.isAdmin ? <Button  size="small" onClick={() => editPic(picture)} variant="contained">Edit </Button> : null }

                  </CardActions>
                </Card>
              </Grid>
          </Grid>
        </Container>
         )})}
      </main>

      <Box sx={{  bgcolor: 'primary.main', p: 6 }} component="footer">
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
export default Pictures