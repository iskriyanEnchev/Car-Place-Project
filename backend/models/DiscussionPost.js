const mongoose = require('mongoose');




const DiscussionSchema = new mongoose.Schema({
    discussion_name: {
        type: String,
        required: true,

    },
    short_description:{
        type: String,
        required: true,

    },
    comments:{
        type: Array
    }
    
})


const Discussion = mongoose.model('Discussion', DiscussionSchema)

module.exports = Discussion;