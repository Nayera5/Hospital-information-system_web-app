import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Bar from "./components/Navbar";
import Home from "./components/Homepage";
import Profile from './components/patientprof';
import Edit from './components/profedit';
import ContactUs from './components/ContactUs';

function AppContent() {
  const location = useLocation();
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    const signedUpStatus = localStorage.getItem("isSignedUp");
    if (signedUpStatus) {
      setIsSignedUp(JSON.parse(signedUpStatus));
    }
  }, []);

  const handleLogin = (status) => {
    setIsSignedUp(status);
    localStorage.setItem("isSignedUp", JSON.stringify(status)); 
  };

  const showNavbar = !["/signup", "/login"].includes(location.pathname);

  return (
    <>
      {showNavbar && <Bar isSignedUp={isSignedUp} setIsSignedUp={handleLogin} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login setIsSignedUp={handleLogin} />} />
        <Route path="/signup" element={<Signup setIsSignedUp={handleLogin} />} />
        <Route path="/get_profile/:id" element={<Profile />} />
        <Route path="/edit/:id" element={<Edit />} />
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
