import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate, useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'





const theme = createTheme();

function EditArticle() {
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {state} = useLocation();
  const  _id = state._id;
  const  currHeading = state.heading;
  const currFullContent = state.full_content
  const currShortDesc = state.short_description


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    

    const heading = data.get('headingOfArticle')
    const shortDesc = data.get('ShortDescription')
    const fullDesc = data.get('ArticleContent')
    
    fetch(`http://localhost:5050/api/articles/${_id}`,{
                headers:{
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                  heading: heading || currHeading,
                  short_description: shortDesc || currShortDesc,
                  full_content: fullDesc || currFullContent,
                  
                })
              })
              
              if(event === null){
                alert("Unsuccesfully edit article!")
                return ;
              }

              alert("Succesfully edit article!")
              navigate('/articles')

  };

  if(!user){
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <DirectionsCarIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Article
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="headingOfArticle"
                  defaultValue={currHeading}
                  required
                  fullWidth
                  id="headingOfArticle"
                  label="Heading of article"
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  maxRows={4}
                  defaultValue={currShortDesc}
                  name="ShortDescription"
                  label="Short Description"
                  type="ShortDescription"
                  id="shortDescription"
                  autoComplete="ShortDescription"
                  color="primary"
                />
                </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  defaultValue={currFullContent}
                  name="ArticleContent"
                  label="Article Content"
                  type="ArticleContent"
                  id="articleContent"
                  autoComplete="ArticleContent"
                  color="primary"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.main'}}
            >
              Edit article
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12} sx={{ mt: 2}}>
              <Button variant="contained"><Link to="/articles">
                  {"Go Back"}
                </Link></Button>
              </Grid>
              </Grid>
          </Box>
        </Box>
        

      </Container>
    </ThemeProvider>
  );
}
export default EditArticle