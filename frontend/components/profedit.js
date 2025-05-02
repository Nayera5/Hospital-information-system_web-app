import { Form, Button, InputGroup } from 'react-bootstrap';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import React,{ useState , useEffect} from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profedit.css';


function Edit() {

  const [user, setUser] = useState([]);
  const [preview, setPreview] = useState(null);
  
  const userId = localStorage.getItem("user_id");

  useEffect(() => {

    if (userId) {
      axios.get(`http://127.0.0.1:5000/get_profile/${userId}`)
        .then(res => {
          setUser(res.data);
          setPreview(res.data.pic);
          console.log(res.data);
        })
        .catch(err => {
          console.log("Error fetching user:", err);
        });
    } else {
      console.log("No user_id found in localStorage");
    }
  }, []);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


    const navigate = useNavigate();

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setUser({
          ...user,
          pic: file
        });
        setPreview(URL.createObjectURL(file));
      }
      else{

      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('name', user.name);
      formData.append('phone', user.phone);
      formData.append('age', user.age);
      // formData.append('blood_type', user.blood_type);
      formData.append('old_password', oldPassword); 
      formData.append('new_password', newPassword); 
      if (user.pic instanceof File) {
        formData.append("pic", user.pic);
      }

      axios.put(`http://127.0.0.1:5000/edit/${userId}` , formData)
        .then(res => {
         navigate(`/get_profile/${userId}`);
          
        })
        .catch(err => {
          console.error("Update error:", err);
        });

    };

  return (
    
        <div className="Update-page">
          
          <div className="edit-card">
            <div className="content">
              
              <h2 className="text-center mb-4" id='update'>Update your Account</h2>
    
    
              <Form onSubmit={handleSubmit} >
                { (
                  <>
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <InputGroup.Text><FaUser /></InputGroup.Text>
                        <Form.Control type="text" name="name" placeholder="name" 
                        value= {user.name} onChange={e =>setUser({...user, name: e.target.value})} />
                      </InputGroup>
                    </Form.Group>
    
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <InputGroup.Text><MdEmail /></InputGroup.Text>
                        <Form.Control type="text" name="email" placeholder="email" 
                        value= {user.email} onChange={e =>setUser({...user, email: e.target.value})} />
                      </InputGroup>
                    </Form.Group>
    
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <InputGroup.Text><RiLockPasswordLine /></InputGroup.Text>
                        <Form.Control type="text" name="old password" placeholder="old password" 
                        value= {oldPassword} onChange={e =>setOldPassword( e.target.value)}/>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <InputGroup>
                        <InputGroup.Text><RiLockPasswordLine /></InputGroup.Text>
                        <Form.Control type="text" name="new password" placeholder="new password" 
                        value= {newPassword} onChange={e =>setNewPassword(e.target.value)}/>
                      </InputGroup>
                    </Form.Group>
    
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <InputGroup.Text><MdDateRange /></InputGroup.Text>
                        <Form.Control type="text" name="age" placeholder="age" 
                        value={user.age} onChange={e =>setUser({...user, age: e.target.value})}/>
                      </InputGroup>
                    </Form.Group>
    
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <InputGroup.Text><FaPhoneAlt /></InputGroup.Text>
                        <Form.Control type="text" name="phone" placeholder="phone" 
                        value= {user.phone} onChange={e => setUser({...user, phone: e.target.value})}/>
                      </InputGroup>
                    </Form.Group>

                    {/*?{user.role === 'patient' && (
                      <>
                        
                      </>
                    )}*/}

                    {preview && (
                      <div className="text-center mb-3">
                        <img src={preview} alt="Profile Preview" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
                      </div>
                    )}    

                    <Form.Group className="mb-3">
                      <Form.Label>Upload Profile Picture</Form.Label>
                      <Form.Control type="file" name="pic"
                      onChange={handleFileChange} />
                    </Form.Group>

    
                    <Button type="submit" className="w-100 custom-button mt-3">
                      Update
                    </Button>

                  </>
                  
                )}
              </Form>
            </div>
          </div>
        </div>
  );
}

export default Edit;