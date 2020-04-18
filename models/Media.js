import mongoose, { Schema } from 'mongoose'
import moment from 'moment'

const MediaSchema = new Schema({
    name: {
        type: String
    },
    purpose: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    uploader: {
        type: String,
        required: true
    },
    information: {
        type: String,
    },
    timestamp: {
        type: String,
        default: moment().format('LL')
    }
})

export default mongoose.model("Media", MediaSchema)