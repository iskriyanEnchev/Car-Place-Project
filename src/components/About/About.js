import  React from 'react';
import NavBar from '../Navigation Bar/Nav';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Grid } from '@mui/material';
import GuestNavBar from '../Guest Home/GuestNavBar';
import {useSelector} from 'react-redux'


const theme = createTheme();

function About(){
const {user} = useSelector((state) => state.user);
    return(
        
     
        <ThemeProvider theme={theme}>
        <CssBaseline />
        {user ? <NavBar/> : <GuestNavBar/> }
        <Grid container component="main" sx={{ height: '91.1vh' }}>
        <CssBaseline />
        <Grid
          item
          md={12}
          sx={{
            backgroundImage: 'url(https://images5.alphacoders.com/488/thumb-1920-488751.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: '1600px 840px',
            
          }}>
            <Typography sx={{mt:7}} variant='h4'>
                This site is made by Iskriyan Enchev for Final Project in Fullstack React Academy!<br/>
                And it's present a place for car guys for fun in free time.
            </Typography>
          </Grid>
    
      </Grid>
        </ThemeProvider>
    );
}
export default About