import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Form, InputGroup, Button, Row, Col, Container } from 'react-bootstrap'
import { Link , useNavigate} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

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
    alert("Login successful");

  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    alert("Something went wrong!");
  }
};

  return (
    <Container fluid className="signin-page">

       <>
        <Link to="/" className="home-icon">
          <FaHome />
        </Link>
      </>
      <Row className="h-100">
        {/* Left side - Image */}
        <Col md={6} className="left-side">
          <img 
            src="nw.jpeg" 
            alt="login visual" 
            className="img-fluid"
          />
        </Col>

        {/* Right side - Form */}
        <Col md={6} className="right-side">
          <Form onSubmit={handleSubmit} className="p-4 rounded shadow" style={{ minWidth: "300px", background: "white" }}>
            <h3 className="text-center mb-4" id='login'>Log In</h3>

            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <MdEmail />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <RiLockPasswordLine />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">
                Log In
              </Button>
            </div>
            <div className="mt-3 text-center">
            <span>Don't have an account? </span>
            <Link to="/signup" className="signup-link" style={{ textDecoration: "none", fontWeight: "bold" }}>
                Sign up
            </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
