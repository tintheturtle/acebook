import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import passport from 'passport'

import users from './routes/api/users'

const func = name => {
  return `Welcome Back ${name}`
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