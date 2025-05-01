import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link , useNavigate} from 'react-router-dom';
import "./Nav.css";



const Bar = ({ isSignedUp, setIsSignedUp }) => {
  const navigate = useNavigate();  // استخدام useNavigate

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      setIsSignedUp(false);  
      navigate('/login');    
    }
  };
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand >
          <img
            src="download.png"
            alt="Hospital Logo"
            style={{ width: '150px', height: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link  id ="home" as={Link} to="/">Home</Nav.Link>
            <Nav.Link  id ="contactus" as={Link} to="/">Contact Us</Nav.Link>


            {isSignedUp ? (
              <>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link as="button" onClick={handleLogout}>Log Out</Nav.Link>  {/* تغيير إلى زر مع onClick */}
            </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/login">Log in</Nav.Link>
              </>
            )}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Bar;