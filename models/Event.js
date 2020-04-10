import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { stringify } from 'querystring'

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    }
})

export default mongoose.model("Event", EventSchema);
