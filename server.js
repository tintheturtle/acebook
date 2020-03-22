import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import passport from 'passport'

import users from './routes/api/users'

import Message from './models/Message'

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
app.use(bodyParser.json())

// DB Config
const uri = process.env.MONGO_URI

// Socket.io Config
const http = require('http').Server(app);
const io = require('socket.io')(http)

const connectedUsers = {}

io.on('connection', (socket) => {
    console.log('a user has connected')

  // Get the last 10 messages from the database.
  Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
    if (err) return console.error(err);

    // Send the last messages to the user.
    socket.emit('init', messages);
  });

  // Socketing receiving messages from frontend
  socket.on('test', ({name, content}) => {

    // Create a message with the content and the name of the user.
    const message = new Message({
      content: content,
      name: name,
    });

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    // Push to frontend for updates
    socket.broadcast.emit('push', ({name, content}))
    
  })

  // Listen to connected users for a new message.
  socket.on('message', () => {
    
    // Notify all other users about a new message.
    socket.broadcast.emit('push', msg);
  });
});

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