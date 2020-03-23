import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import moment from 'moment'

const MessageSchema = new Schema({
    uniqueCode: String,
    people: {
        type: Array,
    },
    list: [{
        content: String,
        name: String,
        time: {
            type: String,
            default: moment().format('LT')
        }
    }]
    }, 
    {
        timestamps: true
    }
)

export default mongoose.model("Message", MessageSchema);
