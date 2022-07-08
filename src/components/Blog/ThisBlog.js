import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../Navigation Bar/Nav';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Chat from '../Chat/Chat';



const theme = createTheme();
function ThisBlog() {

    const {user} = useSelector((state) => state.user);
    const {state} = useLocation();
    const  _id = state._id;
    const name = state.discussion_name


    const navigate = useNavigate();


    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:5050/api/discussions`)
          .then(res => res.json())
          .then(
            (result) => {
                setDiscussions(result);
            })
    }, [])
    console.log(user)
    console.log(name)
    const currDiscussion = discussions.find(discussion => discussion._id === _id)

    const addToFavv = async (discussion) => {
      const resp = await fetch('http://localhost:5050/api/users/register');
     const users = await resp.json();
     const favDiscussions = users.find(item => item._id === user._id).favouritesBlogs
     if(favDiscussions.find(item => item._id === discussion._id)){
      alert("Already added!")
      return
    }
    favDiscussions.push(discussion)
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
  alert("Succesfully added!")
}

 if(!user){
     return null;
    }
return (
    
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <NavBar/>
    <Grid item xs={12} md={6}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {currDiscussion?.discussion_name}
            </Typography>
            <Typography variant="subtitle1" paragraph>
            {currDiscussion?.short_description}
            </Typography>
            <Button onClick={() => navigate(-1)} variant="contained">
                  {"Go Back"}</Button>
            <Button sx={{ml:2}} onClick={() => addToFavv(currDiscussion)}  variant="contained">
                  {"Add to favourite"}</Button>
          </CardContent>
        </Card>
    </Grid>
   
      <Chat location={{name: user.username, room: name}} />


    {/* <Grid>
            <Typography variant="subtitle1" color="primary">
            Comments
            </Typography>
            </Grid>
        <FormControl sx={{mt:2, ml: 3, width:1000}}>
          <InputLabel  htmlFor="outlined-add-comment">Write comment</InputLabel>
          <OutlinedInput
           
            id="outlined-add-comment"
            // value={values.amount}
            // onChange={handleChange('amount')}
            label="Write comment"
          />
          
        </FormControl>
        <Button sx={{ml:3,mt:2,width:100 ,height: 55}} variant="contained">Add comment</Button> */}
            <Box sx={{mt:52.8, bgcolor: 'primary.main', p: 6 }} component="footer">
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
  export default ThisBlog