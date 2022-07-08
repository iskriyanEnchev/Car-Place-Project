const mongoose = require('mongoose');


const dbConnect = () =>{
    //CONNECT DB(MONGODB)
mongoose
.connect(
'mongodb+srv://iskriyan:UNM1Txt68yFSMniI@cluster0.gbt9b.mongodb.net/car-place', 
{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('Db Connected'))
.catch(err => console.log(err))
}

module.exports = dbConnect;

// iskriyan
// UNM1Txt68yFSMniI