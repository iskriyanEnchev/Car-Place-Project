const mongoose = require('mongoose');




const PictureSchema = new mongoose.Schema({
    img_name: {
        type: String,
        required: true,

    },
    short_description:{
        type: String,
        required: true,

    },
    image_link: { 
        type: String,
        required: true,
    }
    
})


const Picture = mongoose.model('Picture', PictureSchema)

module.exports = Picture;