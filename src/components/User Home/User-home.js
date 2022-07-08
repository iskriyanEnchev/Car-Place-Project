import  React from 'react';
import NavBar from '../Navigation Bar/Nav';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux'


const theme = createTheme();



function UserHome(){
  const {user} = useSelector((state) => state.user);
  if(!user){
    return null;
  }
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar/>
        <Grid container component="main" sx={{ height: '91.1vh' }}>
        <CssBaseline />
        <Grid
          item
          md={12}
          sx={{
            backgroundImage: 'url(https://img.wallpapersafari.com/desktop/1600/900/95/68/LVNy4R.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: '1600px 780px',
          }}>
              <Typography sx={{ mt:15, ml: 70}} color='primary' variant="h4" textAlign="center">
              </Typography>
          </Grid>
    
      </Grid>
        </ThemeProvider>
    );
}
export default UserHome