import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { MdEmail } from 'react-icons/md';
import { FaUser, FaPhoneAlt, FaVenusMars, FaPen } from 'react-icons/fa';
import { MdDateRange } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';  

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
    navigate(`/edit/${user.user_id}`);
  };

  return (
    <div className="profile-container container mt-5">
      <div className="row">
        <div className="col-lg-4 col-md-6 profile-sidebar">
          <div className="profile-card text-center">
            <img src={user.pic} alt="Profile" className="profile-pic" />
            <h5 className="mt-3">{user.name}</h5>
          </div>
        </div>

        <div className="col-lg-8 col-md-6">
          <div className="profile-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5>Personal Information</h5>
              <Link className="btn btn-edit" to={`/edit/${user.user_id}`}> Edit <FaPen /></Link>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6 mb-3">
                <span className="label"><MdEmail /> Email address</span>
                <p>{user.email}</p>
              </div>
              <div className="col-md-6 mb-3">
                <span className="label"><FaPhoneAlt /> Phone</span>
                <p>{user.phone}</p>
              </div>
              <div className="col-md-6 mb-3">
                <span className="label"><FaVenusMars /> Gender</span>
                <p>{user.gender}</p>
              </div>
              <div className="col-md-6 mb-3">
                <span className="label"><MdDateRange /> Age</span>
                <p>{user.age}</p>
              </div>
              {user.role==='patient'&&(
              <div className="col-md-6 mb-3">
                <span className="label">Blood Type</span>
                <p>{user.blood_type}</p>
              </div>)}

              {user.role==='doctor'&&(
              <div className="col-md-6 mb-3">
                <span className="label">Specialization</span>
                <p>{user.specialty}</p>
              </div>)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
