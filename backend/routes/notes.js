const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//ROUTE 1 : Get All Notes Of Logged User using : GET "/api/auth/fetchallnotes".
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Error Occured");
    }
});

//ROUTE 2 : Addd a newNote Of using : POST "/api/auth/addnote".
router.post('/addnote',fetchuser,[
    body('title','Enter Valid Title').isLength({min:3}), 
    body('description','Description Should Be atleast Length Of 5').isLength({min:5})
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else{
        try {
            const {title,description,tag} = req.body;
            const notes = new Notes({
                title,description,tag,user:req.user.id
            })
            notes.save();
            res.json(notes);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Error Occured");
        }
    }
});


//ROUTE 3 : Update a existing newNote Of using : DELETE  "/api/auth/deletenote".    
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag} = req.body;
    // find note to be updated
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(401).send("not found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not found");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Successfully deleted":note}  );
});




//ROUTE 4 : Deleting a Note Of using : PUT "/api/auth/updatenote".    
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag} = req.body;
    // create new note object
    const newNote = {};
    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tag){
        newNote.tag = tag;
    }

    // find note to be updated
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(401).send("not found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not found");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true});
    res.json(note);
});



module.exports = router

