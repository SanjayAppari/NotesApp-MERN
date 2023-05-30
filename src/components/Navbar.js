import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
function Navbar() {

    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    return (
        <div className="shadow fixed-top" >
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NotesApp</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="mx-auto"></div>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <Link to="/login" className="mx-1 btn btn-primary" role='button'>LogIn</Link>
                            <Link to="/signup" className="mx-1 btn btn-primary" role='button'>SignUp</Link>
                        </div>
                    </div>
                </div>

            </nav>
            <div className="d-flex align-items-center justify-content-center navbar navbar-expand-lg bg-secondary navbar-dark">
                
                <h2 className='navbar-brand my-0'>NOTES APP</h2>
                
            </div>
        </div>
    )
}

export default Navbar
