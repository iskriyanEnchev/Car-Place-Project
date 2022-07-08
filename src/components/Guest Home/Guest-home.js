import  React from 'react';
import GuestNavBar from './GuestNavBar';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'

const theme = createTheme();



export default function GuestHome(){

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <GuestNavBar/>
        <Grid container component="main" sx={{ height: '91.1vh' }}>
        <CssBaseline />
        <Grid
          item
          md={12}
          sx={{
            backgroundImage: 'url(https://images.hdqwalls.com/download/2021-nissan-gtr-4k-hh-1680x1050.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: '1600px 840px',
          }}>
              <Typography sx={{ mt:35, ml: 120}} color='primary' variant="h5" textAlign="center">
                  To see other page except Picture and Videos you need <br/> 
                  <Link to='/register'>SignUp</Link><br/>
                  or <br/>
                  <Link style={{color:'primary'}} to='/login'>SignIn</Link> <br/>
                  if you already have an account.
              </Typography>
          </Grid>
    
      </Grid>
        </ThemeProvider>
    );

}