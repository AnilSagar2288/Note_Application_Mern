const express = require('express');
const {getNotes, createNote, updateNote, geteNoteId,deleteListNote} = require('../controllers/noteController');
const { protectedRoute } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(protectedRoute,getNotes)
router.route('/create').post(protectedRoute,createNote);
 router.route('/:id').put(protectedRoute,updateNote).get(geteNoteId).delete(protectedRoute,deleteListNote)


module.exports = router