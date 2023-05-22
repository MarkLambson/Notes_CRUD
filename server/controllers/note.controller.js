const Note = require("../models/note.model");

//OPTION 1

// Create note
module.exports.createNote = (req, res) => {
    Note.create(req.body)
        .then(note => res.json({ results: note }))
        .catch(err => res.status(400).json(err));
}

// Read all notes
module.exports.allNotes = (req, res) => {
    Note.find()
        .then(allNotes => res.json({ results: allNotes }))
        .catch(err => res.json(err));
}

// Read one note
module.exports.oneNote = (req, res) => {
    Note.findOne({ _id: req.params.id })
        .then(oneNote => res.json({ results: oneNote }))
        .catch(err => res.json(err));
}

// Update one note
module.exports.updateNote = (req, res) => {
    const idFromParams = req.params.id;
    const updateNote = req.body;
    Note.findOneAndUpdate({ _id: idFromParams }, updateNote, { new: true })
        .then(updatedNote => res.json({ results: updatedNote }))
        .catch(err => res.json(err));
}

// Delete note
module.exports.deleteNote = (req, res) => {
    Note.deleteOne({ _id: req.params.id })
        .then(deletedNote => res.json({ results: deletedNote }))
        .catch(err => res.json(err));
}


/************************************************************************************/