const mongoose = require('mongoose');


const mongo_URL = process.env.MONGO_URL

const ConnectDB = async () => {
    try{
const conn = await mongoose.connect(mongo_URL);
console.log(`MongoDb is Connected....${conn.connection.host}`);
    }catch (err){
        console.log('MongoDb Connected issue:', err);
        process.exit(1);
    }
};

module.exports = ConnectDB;


// .then(()=>{
//     console.log("MongoDb is Connected....");
// }).catch((err)=>{
//     console.log('MongoDb Connected issue:', err);  
// })