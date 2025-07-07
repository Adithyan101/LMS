import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        // required: true,
    },

    publicId:{
        type: String,
        // required: true,
    },
    isPreviewFree: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture
   