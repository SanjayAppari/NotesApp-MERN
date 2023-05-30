import React,{ useState } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {

    const [credentials,setCredentials] = useState({email:"",password:""});

    let navigate = useNavigate ();
    const handleSubmit =  async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
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
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} autoComplete="off" name="email" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange}  value={credentials.password} autoComplete="off" name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
