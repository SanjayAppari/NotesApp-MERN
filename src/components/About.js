import React, {useContext} from 'react'
import noteContext from '../context/notes/notecontext'

function About() {
  const a= useContext(noteContext);
  return (
    <div>
      This is About +  {a.email}
    </div>
  )
}

export default About
