const mongoose = require('mongoose');




const ArticleSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,

    },
    short_description:{
        type: String,
        required: true,

    },
    full_content: {
        type: String,
        required: true,
    }
    
})


const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article;