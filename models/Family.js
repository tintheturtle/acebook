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
    }
})

export default mongoose.model("Family", FamilySchema);
