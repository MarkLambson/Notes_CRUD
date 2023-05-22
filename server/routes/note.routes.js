const NoteController = require("../controllers/note.controller");
//called via Axios by the front end, and only Axios. These are not <Routes />.
module.exports = (app) => {
    // Create a note - C
    app.post("/api/notes/new", NoteController.createNote);

    // Read all notes - R
    app.get("/api/notes", NoteController.allNotes);

    // Read one note - R
    app.get("/api/notes/:id", NoteController.oneNote);

    // Update note - U
    app.put("/api/notes/update/:id", NoteController.updateNote);

    // Delete note - D
    app.delete("/api/notes/delete/:id", NoteController.deleteNote);
}