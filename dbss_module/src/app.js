require('./config/config')
const express = require('express');
const bodyParser = require('body-parser');
const dbssRouter = require('./routes/dbss.router')
const app = express();
const port = process.env.EXTERNAL_PORT || 3003


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });




  app.use('/dte-dbss/api/v1', dbssRouter)

  app.listen(port,()=> {

    console.log("DTE-DBSS API  listen on port:"+ port)
  });
  