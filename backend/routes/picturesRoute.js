const express = require('express');
const Picture = require('../models/PicturePost')
const picturesRoute = express.Router();


picturesRoute.post('/pictures', async (req, res) =>{
    try{

        const{img_name, short_description, image_link} = req.body
        const picture = await Picture.create({img_name, short_description, image_link})
        console.log(picture)
    

    res.send(picture)
    
    }catch(error){
            console.log(error)
        }
    
});

picturesRoute.get('/pictures', async (req, res) =>{
    try{
        const picture = await Picture.find({})
        console.log(picture)
    

    res.send(picture)
    
    }catch(error){
            console.log(error)
        }
    
});
picturesRoute.put('/pictures/:id', async (req, res) => {
    const picture = await Picture.findById(req.params.id);
    if(picture) {
        const updatedPicture = await Picture.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        res.status(200)
        res.json(updatedPicture)
  
    }
    });
  
    picturesRoute.delete('/pictures/:id', async (req, res) => {
     try{
          const picture = await Picture.findByIdAndDelete(req.params.id)
          res.status(200)
          res.send(picture)
          }catch(error){
              res.json(error)
          }
      });
module.exports = picturesRoute;