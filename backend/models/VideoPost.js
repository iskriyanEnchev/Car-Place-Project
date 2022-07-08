const mongoose = require('mongoose');




const VideoSchema = new mongoose.Schema({
    video_name: {
        type: String,
        required: true,

    },
    short_description:{
        type: String,
        required: true,

    },
    video_link: { 
        type: String,
        required: true,
    }
    
})


const Video = mongoose.model('Video', VideoSchema)

module.exports = Video;