import React from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logOutSuccess } from '../../store/login/login-actions';





const FavvNavBar = () => {

  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const favBlog = 'Favourite Blog';
  const favPics ='Favourite Pictures';
  const favVideos ='Favourite Videos';
  const favArticles ='Favourite Articles';
  
  const pages = [favBlog, favPics, favVideos, favArticles]
  const logout = 'Logout';
  const profile = 'Profile';
  const allUsers = 'All Users'
  const myFavs = 'My Favourites';
  const settings = user.isAdmin ? [profile, myFavs, allUsers, logout] : [profile, myFavs, logout]; 


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }
  let navigate = useNavigate();
  const openPage = (page) =>{
  if(page === favPics){
  navigate('/favv-pictures')
  }
  else if(page === favVideos){
    navigate('/favv-videos')
    }
  else if(page === favArticles){
      navigate('/favv-articles')
      }
  else if(page === favBlog){
      navigate('/favv-blogs')
      }
}

    const doSettings = (setting) =>{
      if(setting === logout){
        dispatch(logOutSuccess(user));
        navigate('/')
        }
      if(setting === myFavs){
        navigate('/my-favourites')
        }
      else if(setting === profile){
        navigate('/your-profile')
        }
        else if(setting === allUsers){
          navigate('/all-users')
          }
    } 

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to='/my-favourites'><DirectionsCarIcon sx={{ mr: 2 }}  />Car Place</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}  onClick={handleOpenNavMenu}>
                  <Typography textAlign="center">{pages}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => openPage(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} 
                onClick={() => doSettings(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default FavvNavBar