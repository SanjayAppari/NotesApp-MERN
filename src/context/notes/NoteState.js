import {useState} from 'react';
import NoteContext from './notecontext';


const NoteState = (props) => {
    
    const s1 ={
        "name" : "Sanjay",
        "email": "apparisanjaym6@gmail.com"
    }

    const [state,setState] = useState(s1);

    return (
        <NoteContext.Provider value={{state}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default  NoteState;