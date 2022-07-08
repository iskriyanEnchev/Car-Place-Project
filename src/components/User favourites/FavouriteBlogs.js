import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FavvNavBar from './FavouriteNavBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container';
import { grey } from '@mui/material/colors';
import {useSelector} from 'react-redux'
import { useState, useEffect } from 'react';


const color = grey[900];

const theme = createTheme();
function FavouritesBlog() {
  const {user} = useSelector((state) => state.user);
  const [discussions, setDiscussions] = useState([]);

  useEffect(async () => {
    const resp = await fetch('http://localhost:5050/api/users/register')
    const users = await resp.json();
    const favDiscussions = users.find(item => item._id === user._id).favouritesBlogs
    setDiscussions(favDiscussions)
  }, [])

    const navigate = useNavigate();

  const openThisDiscussion = (discussion) => {
    navigate('/this-discusion', { state: discussion });
  }
  const deleteFromFavv = async (discussion) => {
    const resp = await fetch('http://localhost:5050/api/users/register');
    const users = await resp.json();
    const favDiscussions = users.find(item => item._id === user._id).favouritesBlogs
    const idx = favDiscussions.findIndex(item => item._id === discussion._id)
    favDiscussions.splice(idx, 1)
    console.log('+++',favDiscussions)
    fetch(`http://localhost:5050/api/users/register/${user._id}`,{
     headers:{
         'Content-Type': 'application/json'
     },
     method: 'PUT',
     body: JSON.stringify({
       "favouritesBlogs": favDiscussions

     })
   }).then(res => res.json())
   .then(data => console.log(data))
 alert("Succesfully deleted!")
 setDiscussions(favDiscussions)
  };
 
  if(user === null){
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <FavvNavBar/>
    <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              letterSpacing={2}
            >
             My favourties discussions
            </Typography>
          </Container>

    
    {discussions.map((discussion) => {
            const discussionName= discussion.discussion_name
            const shortDesc = discussion.short_description
           

              return ( 
    <Grid item sx={{mb:3, ml: 37, width: 1000, color: 'primary.main'}}>
      <CardActionArea  component="a" 
      onClick={() => openThisDiscussion(discussion)}>
        <Card sx={{ display: 'flex', bgcolor: 'primary.main' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {discussionName}
            </Typography>
      
            <Typography variant="subtitle1" paragraph>
              {shortDesc}
            </Typography>
            <Typography variant="subtitle1" >
            Enter in conversation!
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
      <Button  size="small" sx={{bgcolor: color, mt: 0.2}} onClick={() => deleteFromFavv(discussion)} variant="contained">Delete from favourite</Button>
    </Grid>
    )})}
    <Box sx={{ bgcolor: 'primary.main', p: 6, mt:53.8  }} component="footer">
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
export default FavouritesBlog