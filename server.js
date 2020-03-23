import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import passport from 'passport'
import uniqid from 'uniqid'

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

  let from = socket.handshake.query['from']
  let to = socket.handshake.query['to']
  console.log('from: ' + from)
  console.log('to: ' + to)
  console.log()

  // Add to unique dictionary of users the socket
  if (from in connectedUsers){

  }
  else {
    // Add key pair value of email and socket ==> email: socket
    socket.name = from
    connectedUsers[socket.name] = socket
  }


  // Get the last 10 messages from the database.
  Message.findOne({ people: { $all : [from, to] }}).sort({createdAt: -1}).limit(10).exec(async (err, messages) => {
    let emitted = false
    if (!messages) {
      const newMessages = new Message({
        uniqueCode: uniqid(),
        people: [from, to],
        list: [{
          content: 'Server!',
          name: from
        }]
      })
      await newMessages.save((err) => {
        if (err) return console.error(err)
      })
      socket.emit('init', newMessages)
      emitted = true
    }
    
    if (err) return console.error(err)

    // Send the last messages to the user.
    if (!emitted) {
      socket.emit('init', messages)
    }
  })

  // Socketing receiving messages from frontend
  socket.on('test', ({name, content, messageID, to }) => {

    // Create a message with the content and the name of the user.
    Message.findOne({ uniqueCode: messageID }).exec(async (err, message) => {
      message.list.push({
        name: name,
        content: content
      })

      // Save the message to the database.
      await message.save((err) => {
        if (err) return console.error(err)
      })
    })

    // Push to frontend for updates
    const pushedMessage = {
      name: name,
      content: content
    }
    console.log(Object.keys(connectedUsers))
    connectedUsers[to].emit('private', pushedMessage)
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