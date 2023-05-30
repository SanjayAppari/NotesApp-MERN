import { useState } from 'react';
import NoteContext from './notecontext';


const NoteState = (props) => {
  const host = "http://localhost:4000";

  const intialNotes = []

  const [notes, setNotes] = useState(intialNotes);

  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token"),

      }
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  }

  // Add a note 
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token"),

      },
      body: JSON.stringify({title,description,tag})
    });

    const json = await response.json();
    console.log("added");
    console.log(json);
  

    // const note = {
    //   "_id": "66474a89edddf4cc8cnnaa1c127",
    //   "user": "64732d7570824ed91099e31f",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2023-05-29T13:29:02.526Z",
    //   "__v": 0
    // };
    setNotes(notes.concat(json));

  }
  // Update a note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token"),

      },
      body: JSON.stringify({title,description,tag})
    });

    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      break;
      }
    }
    setNotes(newNotes); 
  }

  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token"),

      }
    });

    const json = response.json();
    console.log(json);


    console.log("deleting note with :" + id)
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote ,getAllNotes}}>
      {props.children}
    </NoteContext.Provider>
  )


}

export default NoteState;