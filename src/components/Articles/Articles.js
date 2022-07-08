import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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



const theme = createTheme();

function Articles(){
  const {user} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
  
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  console.log(inputText)
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/articles`)
        .then(res => res.json())
        .then(
          (result) => {
            setArticles(result);
          })
  }, [])
  const openThisArticle = (_id) => {
    navigate('/this-article', { state: { _id } });
  };
  const editArticle = (article) => {
    navigate('/edit-article', { state: article});
    
  };
  const deleteArticle = (_id) => {
      
    fetch(`http://localhost:5050/api/articles/${_id}`,{
     
     method: 'DELETE',
  
   }).then(res => res.json())
   .then(data => console.log(data))
  alert("Succesfully deleted!")
  fetch(`http://localhost:5050/api/articles`)
        .then(res => res.json())
        .then(
          (result) => {
            setArticles(result);
          })
  };
  const articlesToShow = inputText.length > 2 ? articles.filter(item => item.heading.toLowerCase().includes(inputText)) : articles
  if(!user){
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     <NavBar/>
      
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
             Articles
            </Typography>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained"><Link to="/add-article">
                  {"Add article"}
                </Link></Button>
            </Stack>
          </Container>
          <TextField sx={{mt: 3}} size="small" id="outlined-basic" label="Search article" color="primary" variant="outlined" onChange={inputHandler} />
        </Box>
        {articlesToShow.map((article) => {
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
                    
                    {user.isAdmin ? <Button  size="small" onClick={() => deleteArticle(article._id)} variant="contained">Delete </Button> : null }
                    {user.isAdmin ? <Button  size="small" onClick={() => editArticle(article)} variant="contained">Edit </Button> : null }
                  </CardActions>
                </Card>
              </Grid>
          </Grid>
        </Container>
        )})}
      </main>

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

export default Articles