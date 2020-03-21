import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import passport from 'passport'

import users from './routes/api/users'

const func = name => {
  return `Welcome back ${name}`
}
console.log(func("Tin"))

const app = express()
dotenv.config()

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  // DB Config
 const uri = process.env.MONGO_URI

 const http = require('http').Server(app);
 const io = require('socket.io')(http)
 io.on('connection', function(socket){
   console.log('a user connected')
   socket.on('disconnect', function(){
     console.log('User Disconnected')
   })
   socket.on('example_message', function(msg){
     console.log('message: ' + msg)
   })
 })
 io.listen(8000)


// Connect to MongoDB
mongoose
   .connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
   .then(() => console.log("MongoDB successfully connected"))
   .catch(err => console.log(err));

// Passport middelware
app.use(passport.initialize())
app.use(passport.session())

// Passport config
require("./config/passport")(passport)

// Routes
app.use("/api/users", users)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server up and running on port ${port} !`))