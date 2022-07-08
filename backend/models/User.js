const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
        
    },
    favouritesPics:{
        type: Array
    },
    favouritesVideos:{
        type: Array
    },
    favouritesArticles:{
        type: Array
    },
    favouritesBlogs:{
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
})
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})
// const isPasswordMatch = await bcrypt.compare(password, user.password);
// const isPasswordMatch =async (enteredPassword) => {
//     await bcrypt.compare(enteredPassword, this.password)};
// UserSchema.method.isPasswordMatch = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password);
// }


const User = mongoose.model('User', UserSchema)

module.exports = User;