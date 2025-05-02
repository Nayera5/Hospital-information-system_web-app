import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link , useNavigate} from 'react-router-dom';
import "./Nav.css";



const Bar = ({ isSignedUp, setIsSignedUp }) => {
  const navigate = useNavigate();  
  
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
          <h1 id="  #
">TopCare</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link  id ="home" as={Link} to="/">Home</Nav.Link>


            {isSignedUp ? (
              <>
              <Nav.Link as={Link} to="/get_profile/:id">Profile</Nav.Link>
              <Nav.Link as="button" onClick={handleLogout}>Log Out</Nav.Link>  
            </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/login">Log in</Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Bar;