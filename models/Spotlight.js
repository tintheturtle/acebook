import mongoose, { Schema } from 'mongoose'
import moment from 'moment'

const SpotlightSchema = new Schema({
    user: {
        type: Object,
        required: true
    },
    questions: {
        type: String,
        required: true
    },
    date: {
        default: moment().format('LL')
    }
})

export default mongoose.model("Spotlight", SpotlightSchema)