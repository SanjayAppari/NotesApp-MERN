import React,{ useState } from 'react'
import { useNavigate } from "react-router-dom";


function Signup() {

  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
 
  let navigate = useNavigate ();
  const handleSubmit =  async(e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch("http://localhost:4000/api/auth/createUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token',json.authToken);
        navigate('/');  
    }
    else{
        alert("Enter Invalid Credentials");
    }
}

const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]: e.target.value});
} 

  return (
    <div style={{ marginTop: "125px" }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="email">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} required aria-describedby="emailHelp" placeholder="Enter Name"/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} required aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange}  required minLength={5} placeholder="Password"/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="cpassword">Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required minLength={5} placeholder="Confirm Password"/>
        </div>
        <button type="submit" className=" btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
