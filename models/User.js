import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const ACESchema = new Schema({

})

const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    ACE: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    matches: {
      type: Array,
      default: []
    },
    lastUserCount: {
      type: Number
    }
  });

  export default mongoose.model("User", UserSchema);
