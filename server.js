import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

const func = name => {
  return `Hello ${name}`
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
const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));