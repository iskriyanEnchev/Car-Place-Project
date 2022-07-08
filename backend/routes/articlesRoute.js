const express = require('express');
const Article = require('../models/ArticlePost')
const articlesRoute = express.Router();


articlesRoute.post('/articles', async (req, res) =>{
    try{

        const{heading, short_description, full_content} = req.body
        const article = await Article.create({heading, short_description, full_content})
        console.log(article)
    

    res.send(article)
    
    }catch(error){
            console.log(error)
        }
    
});

articlesRoute.get('/articles', async (req, res) =>{
    try{
        const article = await Article.find({})
        console.log(article)
    

    res.send(article)
    
    }catch(error){
            console.log(error)
        }
    
});
articlesRoute.put('/articles/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if(article) {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        res.status(200)
        res.json(updatedArticle)
  
    }
    });
  
    articlesRoute.delete('/articles/:id', async (req, res) => {
     try{
          const article = await Article.findByIdAndDelete(req.params.id)
          res.status(200)
          res.send(article)
          }catch(error){
              res.json(error)
          }
      });

module.exports = articlesRoute;