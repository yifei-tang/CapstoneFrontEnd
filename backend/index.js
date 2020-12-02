const express=require('express');
const bodyParser=require('body-parser');
const cors= require('cors');
const mongoose = require('mongoose');
const retrieveRouter=require('./routes/retrieve-data');
const retrieveErr=require('./routes/retrieve-err');
const retrievePred=require('./routes/retrieve-pred');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(bodyParser.json());

const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
const connection=mongoose.connection;
connection.once('open',()=>{console.log("MongoDB database connection established successfully")});


app.use('/act',retrieveRouter);
app.use('/err',retrieveErr);
app.use('/pred',retrievePred);

//start server

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});