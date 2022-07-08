const express = require('express');
const Video = require('../models/VideoPost')
const videosRoute = express.Router();


videosRoute.post('/videos', async (req, res) =>{
    try{

        const{video_name, short_description, video_link} = req.body
        const video = await Video.create({video_name, short_description, video_link})
        console.log(video)
    

    res.send(video)
    
    }catch(error){
            console.log(error)
        }
    
});

videosRoute.get('/videos', async (req, res) =>{
    try{
        const video = await Video.find({})
        console.log(video)
    

    res.send(video)
    
    }catch(error){
            console.log(error)
        }
    
});

videosRoute.put('/videos/:id', async (req, res) => {
    const video = await Video.findById(req.params.id);
    if(video) {
        const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        res.status(200)
        res.json(updatedVideo)
  
    }
    });
  
    videosRoute.delete('/videos/:id', async (req, res) => {
     try{
          const video = await Video.findByIdAndDelete(req.params.id)
          res.status(200)
          res.send(video)
          }catch(error){
              res.json(error)
          }
      });

module.exports = videosRoute;