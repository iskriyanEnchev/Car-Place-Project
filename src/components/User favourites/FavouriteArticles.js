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
import {useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useSelector} from 'react-redux'
import FavvNavBar from './FavouriteNavBar';
import { useState, useEffect } from 'react';


const theme = createTheme();

function FavoutiresArticles(){
  const {user} = useSelector((state) => state.user);
  
  const [articles, setArticles] = useState([]);

  useEffect(async () => {
    const resp = await fetch('http://localhost:5050/api/users/register')
    const users = await resp.json();
    const favArticles = users.find(item => item._id === user._id).favouritesArticles
    setArticles(favArticles)
  }, [])
  const navigate = useNavigate();

  const openThisArticle = (_id) => {
    navigate('/this-article', { state: { _id } });
  };
  const deleteFromFavv = async (article) => {
    const resp = await fetch('http://localhost:5050/api/users/register');
    const users = await resp.json();
    const favArticles = users.find(item => item._id === user._id).favouritesArticles
    const idx = favArticles.findIndex(item => item._id === article._id)
    favArticles.splice(idx, 1)
    console.log('+++',favArticles)
    fetch(`http://localhost:5050/api/users/register/${user._id}`,{
     headers:{
         'Content-Type': 'application/json'
     },
     method: 'PUT',
     body: JSON.stringify({
       "favouritesArticles": favArticles

     })
   }).then(res => res.json())
   .then(data => console.log(data))
 alert("Succesfully deleted!")
 setArticles(favArticles)
  };

  if(!user){
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
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
            My favourites articles
            </Typography>
          </Container>
        </Box>
        {articles.map((article) => {
            const heading = article.heading
            const shortDesc = article.short_description

              return ( 
        <Container sx={{bgcolor: 'primary.main', py: 3}} alignItems="center" maxWidth="md">
          <Grid container spacing={3}>             
              <Grid item key={article._id.toString()}>
                <Card 
                sx={{height: '100%', width:855, display: 'flex', flexDirection: 'column' }} >
            
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {heading}
                    </Typography>
                    <Typography>
                      {shortDesc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button sx={{ bgcolor: 'primary.main' }} name="openThisArticle" variant="contained" size="small" 
                    onClick={() => openThisArticle(article._id)}>
                      Open article
                    </Button>
                    <Button  size="small" onClick={() => deleteFromFavv(article)}  variant="contained">Delete from favourite</Button>
                  </CardActions>
                </Card>
              </Grid>
          </Grid>
        </Container>
        )})}
      </main>

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

export default FavoutiresArticles