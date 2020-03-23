import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const MessageSchema = new Schema({
    uniqueCode: String,
    people: {
        type: Array,
    },
    list: [{
        content: String,
        name: String,
        time: {
            type: Date,
            default: Date.now()
        }
    }]
    }, 
    {
        timestamps: true
    }
)

export default mongoose.model("Message", MessageSchema);
