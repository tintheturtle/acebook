const express = require('express')
const mongoose = require('mongoose') 
const bodyParser = require('body-parser')

const app = express()

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  // DB Config
 const uri = "mongodb+srv://Tin-user-44132:klC9hzPccAK17Zn2@acebook-ogevm.mongodb.net/test?retryWrites=true&w=majority";

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