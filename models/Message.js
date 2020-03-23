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
    }]
    }, 
    {
        timestamps: true
    }
)

export default mongoose.model("Message", MessageSchema);
