import React from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useNavigate, useLocation} from 'react-router-dom'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import NavBar from "../Navigation Bar/Nav";
import Box from '@mui/material/Box';
import {useSelector} from 'react-redux'

const theme = createTheme();



function ThisArticle(){
  const {state} = useLocation();
  const  {_id} = state;

  const navigate = useNavigate();

  const {user} = useSelector((state) => state.user);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/articles`)
        .then(res => res.json())
        .then(
          (result) => {
            setArticles(result);
          })
  }, [])

  const currArticle = articles.find(article => article._id === _id)
  const addToFavv = async (article) => {
    const resp = await fetch('http://localhost:5050/api/users/register');
     const users = await resp.json();
     const favArticles = users.find(item => item._id === user._id).favouritesArticles
     if(favArticles.find(item => item._id === article._id)){
      alert("Already added!")
      return
    }
    favArticles.push(article)
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
  alert("Succesfully added!")
}
  if(!user){
    return null;
  }
    return(
<ThemeProvider theme={theme}>
<CssBaseline />
<NavBar/>
<Grid
      item
      
      sx={{
          py: 3
      }}
    >
      <Typography variant="h4" gutterBottom>
      {currArticle?.heading}
      </Typography>
      <Typography variant="h6" gutterBottom>
      {currArticle?.short_description}
      </Typography>
      <Divider />
        <Typography textAlign={'center'} className="content">
        {currArticle?.full_content}
        </Typography>
    </Grid>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={() => navigate(-1)} variant="contained">
                  {"Go Back"}</Button>
                <Button onClick={() => addToFavv(currArticle)}  variant="contained">Add to favourite</Button>
            </Stack>
          <Box sx={{mt:42.5, bgcolor: 'primary.main', p: 6 }} component="footer">
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
)}

export default ThisArticle