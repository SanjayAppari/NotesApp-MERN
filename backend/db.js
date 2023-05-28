const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/InoteBook";


const connectToMongo = async  ()=>{
   mongoose.connect(mongoURI, await console.log('Connectedd to Mongodb'))  
}


module.exports = connectToMongo;