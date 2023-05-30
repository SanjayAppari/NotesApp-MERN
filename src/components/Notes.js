import React, { useContext, useEffect, useRef ,useState } from 'react'
import noteContext from '../context/notes/notecontext'
import NotesItem from './NotesItem';
import AddNote from './AddNote';

function Notes() {
    const { notes, getAllNotes , editNote } = useContext(noteContext);
    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line
    },[]);
    

    const [note,setNote] = useState({id:"" , etitle:"", edescription:"", etag:""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }

    const ref = useRef(null);
    const refClose = useRef(null);
    const handleClick = (e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value});        
    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="id" className="form-label">Title Of The Note</label>
                                    <input type="text" className="form-control" required minLength={3} name="etitle" id="id" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" name="edescription" required id="description" rows="3" value={note.edescription} onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" name="etag" id="tag" aria-describedby="emailHelp" value={note.etag} onChange={onChange} />
                                </div>
                                {/* <button  type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h3>Your Notes</h3>
                <div className="container">
                    {(notes.length === 0) && "No Notes To Display"}
                </div>
                {notes.map((ele) => {
                    return <NotesItem key={ele._id} updateNote={updateNote} note={ele} />
                })}
            </div>
        </>
    )
}

export default Notes
