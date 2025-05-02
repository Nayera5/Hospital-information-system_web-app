
import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Form, InputGroup, Button, Row, Col, Container } from 'react-bootstrap'
import { Link , useNavigate} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import photo from '../pictures/ai-generated2.jpg'


import axios from 'axios';
import './Signup.css';

const Login = ({ setIsSignedUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://127.0.0.1:5000/login', formData);
    console.log('Response:', response.data);
    localStorage.setItem("user_id", response.data.user_id);

    setIsSignedUp(true); 
    alert("Login successful");
    navigate("/"); 

  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    alert("Something went wrong!");
  }
};

  return (
    <div className="signup-page">
      
      <div className="left-side" style={{
    backgroundImage: `url(${photo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
      <>
  <Link to="/" className="home-icon">
    <FaHome />
  </Link>
</>
<div id="subtitle">
     <h1>TopCare</h1>
        <p  id="pagetext">Precision in every scan, care in every step</p>
      </div>

      </div>
      <div className="right-side">
        <div className="form-content">
          


            <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                        <h2 className="text-center mb-4" id='signup'>Log In</h2>
                        </Form.Group>
            
              <>
               

                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text><MdEmail /></InputGroup.Text>
                    <Form.Control type="email"name="email"placeholder="Email"value={formData.email}onChange={handleChange} required/>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text><RiLockPasswordLine /></InputGroup.Text>
                    <Form.Control type="password"name="password"placeholder="Password"value={formData.password}onChange={handleChange} required/>
                  </InputGroup>
                </Form.Group>

                

                <Button type="submit" className="w-100 custom-button mt-3">
                  Log In
                </Button>

                <div className="text-center mt-3">
                  <span>Don't have an account? </span>
                  <Link to="/signup" className="signup-link" style={{ textDecoration: "none", fontWeight: "bold" }}>
                  Sign Up 
                  </Link>
                </div>


              </>
              
            
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
