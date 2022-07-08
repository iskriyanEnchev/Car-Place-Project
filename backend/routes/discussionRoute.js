const express = require('express');
const Discussion = require('../models/DiscussionPost')
const discussionRoute = express.Router();


discussionRoute.post('/discussions', async (req, res) =>{
    try{

        const{discussion_name, short_description} = req.body
        const discussion = await Discussion.create({discussion_name, short_description})
        console.log(discussion)
    

    res.send(discussion)
    
    }catch(error){
            console.log(error)
        }
    
});

discussionRoute.get('/discussions', async (req, res) =>{
    try{
        const discussion = await Discussion.find({})
        console.log(discussion)
    

    res.send(discussion)
    
    }catch(error){
            console.log(error)
        }
        
});
discussionRoute.put('/discussions/:id', async (req, res) => {
    const discussion = await Discussion.findById(req.params.id);
    if(discussion) {
        const updatedDiscussion = await Discussion.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        res.status(200)
        res.json(updatedDiscussion)
  
    }
    });
  
    discussionRoute.delete('/discussions/:id', async (req, res) => {
     try{
          const discussion = await Discussion.findByIdAndDelete(req.params.id)
          res.status(200)
          res.send(discussion)
          }catch(error){
              res.json(error)
          }
      });

module.exports = discussionRoute;