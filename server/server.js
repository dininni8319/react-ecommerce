// this is the entry point
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const fs = require('fs'); //access to the file system
const { readdirSync } = require('fs'); //access to the file system
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');

//app
const app = express();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECTED"))
.catch(err => console.log(`DB CONNECTION ERR ${err}`, err))

//MIDDLEWARES access to serten features
app.use(morgan('dev'));
app.use(bodyParser.json({limit:'2mb'}));
app.use(cors());

// routes middleware
// app.use('/api', authRoutes);
// dynamically read each route files and require them, is the same as above in the commented code
// this is for auto-load files
readdirSync('./routes').map((r) => 
  app.use("/api", require("./routes/" + r))
);

//port 
const port = process.env.PORT || 8000;
//this method takes the as an argument, second arg takes a callback
app.listen(port, () => console.log(`Server is running on the port ${port}`));
