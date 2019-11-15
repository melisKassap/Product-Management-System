const express = require('express');
const app = express();
const PORT = 3001;
const path = require("path");
const bodyParser = require("body-parser");
const connectMongodb = require("mongodb").MongoClient;
const home = require("./routes/home");
const connectionUrl = "mongodb+srv://#######:#######@cluster0-lf0eb.mongodb.net/test?retryWrites=true&w=majority";
const http = require("http").Server(app);
const io = require("socket.io")(http);

connectMongodb.connect(connectionUrl,{useNewUrlParser:true},(err)=>{
  if(err) throw err;
  

app
  .set('view engine', 'ejs')
  .use(bodyParser.urlencoded({
    extended: false
  }))
  .use(bodyParser.json())
  .use('/static', express.static(path.join(__dirname, './static')))
  .use((req, res, next) => {
    req.connection = connectMongodb;
    next();
  })

  .use('/', home)
  
  io.on('connection', (sockets)=>{
    console.log("a user connected")

    io.on('updateData', function (data) {
      
      console.log(' just sent ');
      console.log(data)
      });
  


    io.on('disconnect', function(){
      console.log('user disconnected');
    });
  })

  http.listen(PORT, () => {
    console.log('Port ' + PORT + ' listening...');
  });

  