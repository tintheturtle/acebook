import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import passport from 'passport'
import uniqid from 'uniqid'
import moment from 'moment'

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

  let from = socket.handshake.query['from']
  let to = socket.handshake.query['to']

  if (from in connectedUsers){

  }
  else {
    // Add key pair value of email and socket ==> email: socket
    socket.name = from
    connectedUsers[socket.name] = socket
  }

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`)
    delete connectedUsers[from]
  })



  // Get the last 10 messages from the database.
  Message.findOne({ people: { $all : [from, to] }}).sort({createdAt: -1}).limit(10).exec(async (err, messages) => {
    let emitted = false
    // if first time chatting, create a new message schema 
    if (!messages) {
      const newMessages = new Message({
        uniqueCode: uniqid(),
        people: [from, to],
        list: [{
          content: 'Hello!',
          name: from,
          time: moment().format('LT')
        }]
      })
      await newMessages.save((err) => {
        if (err) return console.error(err)
      })
      // Emit the new schema
      socket.emit('init', newMessages)
      emitted = true
    }
    
    // Log any errors
    if (err) return console.error(err)

    // Send the last messages to the user.
    if (!emitted) {
      socket.emit('init', messages)
    }
  })

  // Socketing receiving messages from frontend
  socket.on('test', ({name, content, messageID, receiver }) => {

    // Create a message with the content and the name of the user.
    Message.findOne({ uniqueCode: messageID }).exec(async (err, message) => {
      message.list.push({
        name: name,
        content: content,
        time: moment().format('LT')
      })

      // Save the message to the database.
      await message.save((err) => {
        if (err) return console.error(err)
      })
    })

    // Push to frontend for updates
    const pushedMessage = {
      name: name,
      content: content,
      time: moment().format('LT')
    }

    const sendTo = connectedUsers[receiver]

    if (sendTo) {
      sendTo.emit('private_chat', pushedMessage)
    }

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