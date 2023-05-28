const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mydb";


const connectToMongo = async  ()=>{
   mongoose.connect(mongoURI, await console.log('Connectedd to Mongodb'))  
}


module.exports = connectToMongo;