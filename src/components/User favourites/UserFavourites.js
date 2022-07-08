import  React from 'react';
import FavvNavBar from './FavouriteNavBar';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'


const theme = createTheme();



function UserFavourites(){
  const {user} = useSelector((state) => state.user);
  if(!user){
    return null;
  }
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <FavvNavBar/>
        <Grid container component="main" sx={{ height: '91.1vh' }}>
        <CssBaseline />
        <Grid
          item
          md={12}
          sx={{
            backgroundImage: 'url(https://wallpaperaccess.com/full/1771233.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: '1600px 850px',
          }}>
              <Typography sx={{ mt:12}} variant="h2" textAlign="center">
                  My favourites
              </Typography>
              <Button size='large' variant="contained"><Link to="/user-home">
                  {"Go Back"}
                </Link></Button>
          </Grid>
    
      </Grid>
        </ThemeProvider>
    );
}


export default UserFavourites