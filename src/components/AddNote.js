import React ,{ useContext, useState } from 'react'
import noteContext from '../context/notes/notecontext'

function AddNote() {
    const { addNote } = useContext(noteContext);

    const [note,setNote] = useState({title:"", description:"", tag:"default"})

    const handleClick = (e)=>{
        e.preventDefault();
        console.log(note.description);
        addNote(note.title,note.description,note.tag);
        setNote({title:"", description:"", tag:"default"});
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value});        
    }
  return (
    <div>
        <div className="container my-3">
        <h3>Add Note</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">Title Of The Note</label>
            <input type="text" className="form-control"minLength={3}  value={note.title} required name="title" id="id" aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" name="description" value={note.description} required id="description" rows="3" onChange={onChange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" name="tag" id="tag" value={note.tag} aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <button  disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
