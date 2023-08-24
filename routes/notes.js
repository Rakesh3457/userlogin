const express = require('express')
const router = express.Router();

const NoteController = require('../controllers/notes');

router.get('/getNote', NoteController.getNotes);
router.put('/addNote', NoteController.postNote);
router.patch('/editNote/:id', NoteController.editNote);
router.delete('/deleteNote/:id', NoteController.deleteNote);

module.exports = router;