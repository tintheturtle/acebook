import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import passport from 'passport'
import uniqid from 'uniqid'
import moment from 'moment'
import cors from 'cors'
import path from 'path'

import users from './routes/api/users'
import upload from './routes/api/upload'
import family from './routes/api/family'
import feed from './routes/api/feed'

import Message from './models/Message'
import User from './models/User'
import Media from './models/Media'

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

// CORS
app.use(cors())

// Passport middelware
app.use(passport.initialize())
app.use(passport.session())

// Passport config
require("./config/passport")(passport)

// Routes
app.use("/api/users", users)
app.use("/api/upload", upload)
app.use("/api/family", family)
app.use("/api/feed", feed)

// Serving frontend from backend
app.use(express.static(path.join(__dirname, "client/public/img")))
app.use(express.static(path.join(__dirname, "client/build")))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

// DB Config
let uri = process.env.MONGO_URI

if (!uri) {
  uri = 'mongodb://127.0.0.1:27017/tests'
}

// Connect to MongoDB
mongoose
   .connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
   .then(() => console.log("MongoDB successfully connected"))
   .catch(err => console.log(err))

// Socket.io Config
const server = require('http').createServer(app);
const io = require('socket.io').listen(server)

// Collection of sockets of connected users
const connectedUsers = {}

// Initialize public group chat
Message.findOne({ people: ['public'], type: 'public'}).then( (msg) => {
  if (!msg) {
    const newMessage = new Message({
      type: 'public',
      uniqueCode: uniqid(),
      people: ['public'],
      list: [{
        content: 'Hello, welcome to the public chat!',
        name: 'Family Chair',
        time: moment().format('LT')
      }]
    })
    
    newMessage.save().then(
      console.log('Public Group Chat Initialized')
    )
  }
  else {
    console.log('Public Group Chat already initialized')
  }
})

Media.find().then(post => {
  if (post.length < 1) {
    // Create new post
  }
})


// Socket IO Connection
io.on('connection', (socket) => {

  // Retrieve sender and receiver info
  let from = socket.handshake.query['from']
  let to = socket.handshake.query['to']

  // Check if in connected user dictionary
  if (from in connectedUsers){

  }
  else {
    // Add key pair value of email and socket ==> email: socket
    socket.name = from
    connectedUsers[socket.name] = socket
  }

  // Remove disconnected users from socket list
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`)
    delete connectedUsers[from]
  })


  socket.on('public_init', () => {
    Message.findOne({ people: ['public'], type: 'public' }).sort({createdAt: -1}).limit(10).exec( (err, messages) => {
      socket.emit('public_message', messages)
    })
  })

  socket.on('public', ({name, content }) => {
    // Create a message with the content and the name of the user.
    Message.findOne({ people: ['public'] }).exec(async (err, message) => {
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
    socket.broadcast.emit('public_chat_send', pushedMessage)
  })

  socket.on('private_init', () => {
    // Get the last 10 messages from the database.
    Message.findOne({ people: { $all : [from, to] }, type: 'match'}).sort({createdAt: -1}).limit(10).exec(async (err, messages) => {
      let emitted = false
      // if first time chatting, create a new message schema 
      if (!messages) {
        // Create new message schema for storing past messages
        const newMessages = new Message({
          type: 'match',
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
  })

  // Socketing receiving messages from frontend
  socket.on('private', ({name, content, messageID, receiver }) => {
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
    // Retrieve socket to receiver 
    const sendTo = connectedUsers[receiver]
    // Update recent message list
    User.find({ $or: [{email: receiver}, {email: from}] }).exec(async (err, users) => {
      let first = users[0]
      let second = users[1]


      if(first.recents.length === 0) {
        first.recents.push(second.email + '|' + second.name + '|' + moment().format('LLL'))
      }

      if (second.recents.length === 0) {
        second.recents.push(first.email + '|' + first.name + '|' + moment().format('LLL'))
      }

      let firstRecent = first.recents[first.recents.length-1].split('|')[0]
      let secondRecent = second.recents[second.recents.length-1].split('|')[0]

      if (firstRecent !== second.email) {
        first.recents.push(second.email + '|' + second.name + '|' + moment().format('LLL'))
      }
      else {
        first.recents.pop()
        first.recents.push(second.email + '|' + second.name + '|' + moment().format('LLL'))
      }
      if (secondRecent !== first.email) {
        second.recents.push(first.email + '|' + first.name + '|' + moment().format('LLL'))
      }
      else {
        second.recents.pop()
        second.recents.push(first.email + '|' + first.name + '|' + moment().format('LLL'))
      }
      await first.save()
      await second.save()

    })

    // Emit private message to frontend 
    if (sendTo) {
      sendTo.emit('private_chat', pushedMessage)
    }
  })

  socket.on('family_init', ({ members }) => {
    // Get the last 10 messages from the database.
    Message.findOne({ people: { $all :[members]}, type: 'family'}).sort({createdAt: -1}).limit(10).exec(async (err, messages) => {
      let emitted = false
      // if first time chatting, create a new message schema 
      if (!messages) {
        // Create new message schema for storing past messages
        const newMessages = new Message({
          uniqueCode: uniqid(),
          type: 'family',
          people: members,
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
        socket.emit('family_start', newMessages)
        emitted = true
      } 
      // Log any errors
      if (err) return console.error(err)
      // Send the last messages to the user.
      if (!emitted) {
        socket.emit('family_start', messages)
      }
    })
  })


  // Add groupchat feature
  socket.on('family', ({ name, content, members, receiver}) => {
    // Find family groupchat
    Message.findOne({ people: members }).exec(async (err, message) => {
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
    members.forEach( person => {
      // Retrieve socket to receiver 
      const sendTo = connectedUsers[person]
      // Emit private message to frontend 
      if (sendTo && person !== from) {
        sendTo.emit('family_chat', pushedMessage)
      }
    })
  })
})

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`Server up and running on port ${port} !`))