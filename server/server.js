const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv= require('dotenv');

const app = express();
const router = require("./router");

//app setup
dotenv.load();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));
router(app);

mongoose.connect(process.env.MONGO_URI, function(db) {
   var server = app.listen(process.env.PORT, function(){
      var port = server.address().port;
      console.log("listening to "+port);
   });
});