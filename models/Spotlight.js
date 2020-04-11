import mongoose, { Schema } from 'mongoose'
import moment from 'moment'

const SpotlightSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    questions: {
        type: Array,
        default: []
    },
    published: {
        type: String,
        default: moment().format('LL')
    }
})

export default mongoose.model("Spotlight", SpotlightSchema)