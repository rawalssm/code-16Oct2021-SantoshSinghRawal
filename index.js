const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/initlogger');
//const db = require("./config/db");

// globas variables
const app = express();
dotenv.config({path:'./config/config.env'});
const PORT = process.env.PORT || 8001;

console.log (`  ${process.env.MSDB_HOST} , ${process.env.MSDB_USER} ,  ${process.env.MSDB_DB}`)

//db.sequelize.sync();

// user middleware
app.use(express.json());
app.use(logger);


// defafult route
app.get('/' , (req,res) => {
    res.append('Start' , 'Yes')
    res.status(200).json({
        error:false, message:'server is up and running'
    })
})

//+++++++++ routes===================

const appRoute = require('./api/routes/appRoutes');
app.use('/api/v1/BMI' , appRoute);


//start the server +++++++++++++++++++++++++++++++++++++
const server = app.listen(PORT , (req,res) => {
    console.log('server is running on Port : ' + PORT);
})