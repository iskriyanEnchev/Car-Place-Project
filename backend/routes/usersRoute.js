const express = require('express');
const User = require('../models/User');
const usersRoute = express.Router();
// const asynHandler = require('express-async-handler')
// const bcrypt = require('bcryptjs')


//ROUTES(END POINT)
usersRoute.post('/register',async (req, res) =>{
    try{
        
        const {name, username, password, gender} = req.body
        const user = await User.create({name, username, password, gender})
console.log(user)

res.send(user)

    }catch(error){
        console.log(error)
    }
});

usersRoute.get('/register', async (req, res) =>{
    try{
        const user = await User.find({})
        console.log(user)
    

    res.send(user)
    
    }catch(error){
            console.log(error)
        }
    
});

usersRoute.put('/register/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if(user) {
      const udatedUser = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
              new: true,
              runValidators: true,
          }
      )
      res.status(200)
      res.json(udatedUser)

  }
  });

  usersRoute.delete('/register/:id', async (req, res) => {
   try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200)
        res.send(user)
        }catch(error){
            res.json(error)
        }
    });

// usersRoute.post('/login',asynHandler(async (req, res) =>{
//     const {username, password} = req.body;
    
//     const user = await User.findOne({username});
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if(user && isPasswordMatch){
       
//         res.status(200);
//         res.json({
//         _id: user._id,
//         name: user.name,
//         username: user.username,
//         password: user.password,
//         gender: user.gender
//         });
//     }
//     else{
//         res.status(401)
//         res.send('Invalid inputs')
//     }
//     })
// );


module.exports = usersRoute;
