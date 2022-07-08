import './App.css';
import UserHome from './components/User Home/User-home';
import {Route, Routes} from 'react-router-dom'
import Pictures from './components/Pictures/Pictures';
import Videos from './components/Videos/Videos';
import SignUp from './components/Register/Register';
import GuestHome from './components/Guest Home/Guest-home';
import SignIn from './components/Login/Login';
import About from './components/About/About';
import AddPicture from './components/Add picture/AddPic'
import AddVideo from './components/Add video/AddVideo';
import Articles from './components/Articles/Articles';
import AddArticle from './components/Add article/AddArticle';
import ThisArticle from './components/Articles/ThisArticle';
import Blog from './components/Blog/Blog';
import ThisBlog from './components/Blog/ThisBlog';
import YourProfile from './components/UserProfile/UserProfile';
import AddDiscussion from './components/Add discusion/AddDiscussion';
import UserFavourites from './components/User favourites/UserFavourites';
import FavouritePics from './components/User favourites/FavouritePics';
import FavouritesVideos from './components/User favourites/FavouriteVideos';
import FavouritesBlog from './components/User favourites/FavouriteBlogs';
import FavoutiresArticles from './components/User favourites/FavouriteArticles';
import EditProfile from './components/Edit Profile/EditProfile';
import AllUsers from './components/All Users/AllUsers';
import AdminEditUser from './components/All Users/AdminEditUser';
import EditPicture from './components/Edit picture/EditPicture';
import EditVideo from './components/Edit Video/EditVideo';
import EditArticle from './components/Edit Article/EditArticle';
import EditDiscussion from './components/Edit discussion/EditDiscussion';
import EditPassword from './components/Edit password/EditPassword';
import EditPassAdmin from './components/All Users/EditPassAdmin'


function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<GuestHome />} />

        <Route path="/user-home" element={<UserHome />} />

        <Route path="/pictures" element={<Pictures />} />

        <Route path="/videos" element={<Videos />} />

        <Route path="/articles" element={<Articles />} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/register" element={<SignUp />} />

        <Route path="/login" element={<SignIn />} />

        <Route path="/about" element={<About />} />

        <Route path="/add-pic" element={<AddPicture />} />

        <Route path="/add-video" element={<AddVideo />} />

        <Route path="/add-discussion" element={<AddDiscussion/>} />

        <Route path="/this-discusion" element={<ThisBlog />} />

        <Route path="/add-article" element={<AddArticle />} />

        <Route path="/this-article" element={<ThisArticle />} />

        <Route path="/your-profile" element={<YourProfile />} />

        <Route path="/my-favourites" element={<UserFavourites />} />

        <Route path="/favv-pictures" element={<FavouritePics />} />

        <Route path="/favv-videos" element={<FavouritesVideos />} />

        <Route path="/favv-blogs" element={<FavouritesBlog />} />

        <Route path="/favv-articles" element={<FavoutiresArticles />} />

        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/all-users" element={<AllUsers />} />

        <Route path="/admin-edit-user" element={<AdminEditUser />} />

        <Route path="/edit-picture" element={<EditPicture />} />

        <Route path="/edit-video" element={<EditVideo />} />

        <Route path="/edit-article" element={<EditArticle />} />

        <Route path="/edit-discussion" element={<EditDiscussion />} />

        <Route path="/edit-password" element={<EditPassword />} />

        <Route path="/admin-edit-user-password" element={<EditPassAdmin />} />


      </Routes>
    </div>
  );
}

export default App;
