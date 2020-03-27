import mongoose, { Schema } from 'mongoose'

const FamilySchema = new Schema({
    name: {
        default: String,
        required: true
    },
    member: {
        type: Array,
        default: []
    },
    pictures: {
        type: Array,
        default: []
    }
})

export default mongoose.model("Family", FamilySchema);
