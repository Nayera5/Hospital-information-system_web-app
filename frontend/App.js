import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion';
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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactUs /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login setIsSignedUp={handleLogin} /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><Signup setIsSignedUp={handleLogin} /></PageWrapper>} />
          <Route path="/get_profile/:id" element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="/edit/:id" element={<PageWrapper><Edit /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
