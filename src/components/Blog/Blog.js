import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../Navigation Bar/Nav';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import {Link, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container';
import {useSelector} from 'react-redux'

const theme = createTheme();
function Blog() {
  const {user} = useSelector((state) => state.user);

    const navigate = useNavigate();

const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
  
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  console.log(inputText)

  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/discussions`)
        .then(res => res.json())
        .then(
          (result) => {
            setDiscussions(result);
          })
  }, [])

  const openThisDiscussion = (discussion) => {
    navigate('/this-discusion', { state: discussion});
  };
  const editDiscussion = (discussion) => {
    navigate('/edit-discussion', { state: discussion });
    
  };
  const deleteDiscussion = (_id) => {
      
    fetch(`http://localhost:5050/api/discussions/${_id}`,{
     
     method: 'DELETE',
  
   }).then(res => res.json())
   .then(data => console.log(data))
  alert("Succesfully deleted!")
  fetch(`http://localhost:5050/api/discussions`)
        .then(res => res.json())
        .then(
          (result) => {
            setDiscussions(result);
          })
  };

  const discussionsToShow = inputText.length > 2 ? discussions.filter(item => item.discussion_name.toLowerCase().includes(inputText)) : discussions
  if(user === null){
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <NavBar/>
    <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              letterSpacing={2}
            >
             Discussions
            </Typography>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
                <Button  variant="contained"><Link to="/add-discussion">
                  {"Add discussion"}
                </Link></Button>
            </Stack>
          </Container>
          <TextField sx={{mt:3, mb:5}} size="small" id="outlined-basic" label="Search discusion" color="primary" variant="outlined" onChange={inputHandler} />

    
    {discussionsToShow.map((discussion) => {
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
      {user.isAdmin ? <Button sx={{ mt: 1 }} onClick={() => deleteDiscussion(discussion._id)} size="small"  variant="contained">Delete </Button> : null }
      {user.isAdmin ? <Button sx={{ml:1, mt: 1 }} onClick={() => editDiscussion(discussion)} size="small"  variant="contained">Edit</Button> : null }
    </Grid>
    )})}
    <Box sx={{mt:31.3, bgcolor: 'primary.main', p: 6 }} component="footer">
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
export default Blog