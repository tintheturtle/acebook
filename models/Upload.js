import mongoose, { Schema } from 'mongoose'

const UploadSchema = new Schema({ 
    email: {
        type: String,
        default: 'tinhoang@bu.edu'
    },
    url: {
        type: String,
    }
})

export default mongoose.model("Upload", UploadSchema);
