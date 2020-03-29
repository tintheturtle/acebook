import mongoose, { Schema } from 'mongoose'

const FamilySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    memberObjects: {
        type: Array,
        default: []
    },
    members: {
        type: Array,
        default: []
    },
    pictures: {
        type: Array,
        default: []
    },
    time: {
        type: String
    },
    score: {
        type: Number,
        default: 0
    }
})

export default mongoose.model("Family", FamilySchema);
