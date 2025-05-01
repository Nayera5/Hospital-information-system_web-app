import { Form, Button, InputGroup } from 'react-bootstrap';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import React,{ useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Link , useNavigate} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaVenusMars } from "react-icons/fa";


import axios from 'axios';


import './Signup.css';


function Signup({ setIsSignedUp }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    blood_type: '',
    phone: '',
    age: '',
    pic: null
  });

  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        pic: file
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
  
    // Reset form data
    setFormData({
      name: '',
      email: '',
      password: '',
      specialty: '',
      blood_type: '',
      phone: '',
      age: '',
      gender: '',
      pic: null
    });
  
    setPreview(null);
    setError(''); 
  };
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("email", formData.email);
    dataToSend.append("password", formData.password);
    dataToSend.append("phone", formData.phone);
    dataToSend.append("age", formData.age);
    dataToSend.append("gender", formData.gender);
    dataToSend.append("role", role);
  
    if (formData.pic) {
      dataToSend.append("pic", formData.pic);
    }
  
    if (role === "doctor") {
      dataToSend.append("specialty", formData.specialty);
    }
  
    if (role === "patient") {
      dataToSend.append("blood_type", formData.blood_type);
    }
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/reg", dataToSend);
      console.log("Response from backend:", response.data);
      alert("Registration successful!");
      setIsSignedUp(true);  // ✅ استخدام الدالة المرسلة
      navigate("/"); 

    } catch (error) {
      console.error("Error sending data:", error);
      alert("Something went wrong!");

    }
  };



  return (

    

    <div className="signup-page">
      
      <div className="left-side">
      <>
  <Link to="/" className="home-icon">
    <FaHome />
  </Link>
</>

        <h2>MediCare</h2>
        <p>We at MediCare are always fully focused on helping your child.</p>
      </div>
      <div className="right-side">
        <div className="form-content">
          
          <h2 className="text-center mb-4" id='signup'>Create Account</h2>


          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Choose your role</Form.Label>
              <Form.Select value={role} onChange={handleRoleChange}>
                <option value="">Select Role</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </Form.Select>
            </Form.Group>

            {role && (
              <>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control type="text" name="name" placeholder="name" value={formData.name}onChange={handleChange} required/>
                  </InputGroup>
                </Form.Group>

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

                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text><MdDateRange /></InputGroup.Text>
                    <Form.Control type="number"name="age"placeholder="Age"min="1"max="120"value={formData.age}onChange={handleChange} required/>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text><FaPhoneAlt /></InputGroup.Text>
                    <Form.Control type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required/>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                <InputGroup>
                <InputGroup.Text><FaVenusMars /> </InputGroup.Text>
                 <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                       <option value="">Select Gender</option>
                         <option value="male">Male</option>
                          <option value="female">Female</option>
                  </Form.Select>
                  </InputGroup>
                   </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Upload Profile Picture</Form.Label>
                  <Form.Control type="file" name="pic"onChange={handleFileChange} required/>
                </Form.Group>

                {preview && (
                  <div className="text-center mb-3">
                    <img src={preview} alt="Profile Preview" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
                  </div>
                )}

                {role === 'doctor' && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Control type="text"name="specialty"placeholder="Specialization"value={formData.specialty}onChange={handleChange} required/>
                    </Form.Group>
                   
                  </>
                )}

                {role === 'patient' && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Control type="text"name="blood_type"placeholder="Blood Type"value={formData.blood_type}onChange={handleChange} />
                    </Form.Group>
                  </>
                )}

                <Button type="submit" className="w-100 custom-button mt-3">
                  Sign Up
                </Button>

                <div className="text-center mt-3">
                  <span>Already have an account? </span>
                 {/* <a href="/login" className="login-link">Log in</a>*/}
                  <Link to="/login" className="login-link" style={{ textDecoration: "none", fontWeight: "bold" }}>
                  Log in 
                  </Link>
                </div>


              </>
              
            )}
          </Form>
        </div>
      </div>
    </div>
  );}
export default Signup;
