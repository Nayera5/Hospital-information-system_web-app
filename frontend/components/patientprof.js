import React , {useState , useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FaPhoneAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaVenusMars } from "react-icons/fa";
import { FaPen } from 'react-icons/fa';
import { Link , useNavigate} from 'react-router-dom';


const Profile = () => {
    
  const [user, setUser] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {

    if (userId) {
      axios.get(`http://127.0.0.1:5000/get_profile/${userId}`)
        .then(res => {
          setUser(res.data);
          console.log(res.data);
        })
        .catch(err => {
          console.log("Error fetching user:", err);
        });
    } else {
      console.log("No user_id found in localStorage");
    }
  }, []);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    navigate(`./edit/${user.user_id}`)
  };

  return (
    <div className="profile-container">
      <div className="row">
        {/* Sidebar Column (Cards on the left) */}
         <div className="profile-card">   {/* row/col-lg-8: Creates a grid layout with 8 columns width, leaving space on the right to align cards to the left. */}
          {/* Profile Card */}
          <div className="profile-card">
              <div className="d-flex align-items-center">
                <img
                  src= {user.pic}
                  alt="Profile"
                  className="profile-pic"
                />
                <div>
                  <h5 className="mb-1">{user.name}</h5>
                  {/* <p className="text-muted mb-1">Product Designer</p>
                  <small className="text-secondary">Los Angeles, California, USA</small> */}
                </div>
              </div>
          </div>

          {/* Combined Info Card */}
          <div className="profile-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Personal Information</h5>
                <Link className="btn btn-edit" 
                to = {`/edit/${user.user_id}`}> Edit <FaPen /></Link>
                
              </div>
              <hr className="my-3" />

              <div className="row">
                {/* <div className="col-md-6 mb-2">
                
                  <span className="label"> <FaUser />  First Name </span> {user.name}
                </div>
                <div className="col-md-6 mb-2">
                  <span className="label"><FaUser />  Last Name</span> {user.name}
                </div> */}
                
                <div className="col-md-6 mb-2">
                  <span className="label"><MdEmail />  Email address</span> {user.email}
                </div>
                <div className="col-md-6 mb-2">
                  <span className="label"><FaPhoneAlt />  Phone</span> {user.phone}
                </div>
                <div className="col-md-6 mb-2">
                  <span className="label"><FaVenusMars />  Gender</span> {user.gender}
                </div>
                <div className="col-md-6 mb-2">
                  <span className="label"><MdDateRange />  Age</span> {user.age}
                </div>
                <div className="col-md-6 mb-2">
                  <span className="label">Blood Type</span> {user.blood_type}
                </div>
                <hr className="my-3" />
                
                
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
