import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Bar from "./component/Navbar";
import Home from "./component/Homepage";
import Profile from './components/patientprof';
import Edit from './components/profedit';

function AppContent() {
  const location = useLocation();
  const [isSignedUp, setIsSignedUp] = useState(false);

  const showNavbar = !["/signup", "/login"].includes(location.pathname);

  return (
    <>
      {showNavbar && <Bar isSignedUp={isSignedUp} />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login setIsSignedUp={setIsSignedUp} />} />
        <Route path="/signup" element={<Signup setIsSignedUp={setIsSignedUp} />} />
        <Route path="/get_profile/:id" element={<Profile/>} />
        <Route path="/edit/:id" element={<Edit/>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
