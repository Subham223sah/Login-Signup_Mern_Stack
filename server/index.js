require('dotenv').config();
const express = require("express")
const connectDb = require('./DB/connection')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require('./Routes/AuthRouter')
const app = express();



const PORT= process.env.PORT || 8000
connectDb();

// MIDDLEWARE
app.use(bodyParser.json())
app.use(cors());

//  Use the AuthRoter routes
app.use('/auth', authRouter)


// ROUTING :






app.listen(PORT, ()=>{
    console.log(`The Server is Running Port: ${PORT}`);
})

