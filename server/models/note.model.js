const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title must contain 2 characters"],
        minLength: [2, "Title must be at least 2 characters"]
    },
    body: {
        type: String,
        required: [true, "Body must contain max of 255 characters"],
        maxLength: [255, "Body must contain max of 255 characters"]
    }
}, { timestamps: true })

// Option 1
const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;