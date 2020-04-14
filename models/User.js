import mongoose from 'mongoose'
import { Schema } from 'mongoose'

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
    },
    algorithm: {
      type: String,
      required: true
    },
    recents: {
      type: Array,
      default: []
    }
  });

  export default mongoose.model("User", UserSchema);
