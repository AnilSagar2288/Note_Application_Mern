const Note = require ('../models/noteModel');
const asyncHandler = require ('express-async-handler');

const getNotes = asyncHandler (async (req, res) => {
  const notes = await Note.find ({user: req.user._id});
  res.json (notes);
});

const createNote = asyncHandler (async (req, res) => {
  const {title, content, category} = req.body;
  if (!title || !content || !category) {
    res.status (400);
    throw new Error ('Please fill the fields');
    return;
  } else {    
    const note = new Note ({user: req.user._id, title, content, category});
    const createnote = await note.save ();
    res.status (201).json (createnote);
  }
});

const updateNote = asyncHandler (async(req,res)=>{
    const {title, content, category} = req.body;    
    const note = await Note.findById(req.params.id);

    if(note.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("you can't perform this action")
    }

    if(note){
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save();
        res.json(updatedNote)
    }else{
        res.status (404);
        throw new Error ('note not found');
    }

});

const geteNoteId = asyncHandler(async (req,res)=>{
    const note = await Note.findById(req.params.id);
    if(!note){
        res.status(404).json({message:"Note not found"})        
    }else{
        res.json(note);
    }
});

const deleteListNote = asyncHandler(async(req,res)=>{
    const note = await Note.findById(req.params.id);

    if(note.user.toString() !== req.user._id.toString()){
        res.status(201);
        throw new Error("You can not perform this action")
    }

    if(!note){
        res.status(404).json({message:"Note not found"})
    }else{
        await note.remove();
        res.json("Note deleted")
    }

})

module.exports = {getNotes, createNote,updateNote,geteNoteId,deleteListNote} ;
