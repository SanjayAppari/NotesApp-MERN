import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import Alert from "./components/Alert";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert message="My alert ra babu"/> */}
          <div className="container my-3" >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={ <Login/> } />
              <Route exact path="/signup" element={ <Signup/> } />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
