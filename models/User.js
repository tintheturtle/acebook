import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const ACESchema = new Schema({
    paired: { 
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true
    },
    lastUserCount: {
      type: Number,
      default: 0
    },
    characteristics: {
      type: String,
      required: true
    }
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
    paired: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
    },
    matchEmailList: {
      type: Array,
      default: []
    },
    matches: {
      type: Array,
      default: []
    },
    lastUserCount: {
      type: Number,
      default: 0
    },
    headshotURL: {
      type: String,
      default: ''
    }
  });

  export default mongoose.model("User", UserSchema);
