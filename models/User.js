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
    }
  });

  export default mongoose.model("User", UserSchema);
