import React from 'react';
import './contactus.css';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';

function ContactUs() {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <h2>Contact Us</h2>
        <p>Feel free to reach out to us!</p>
        
        <div className="contact-item">
          <MdEmail className="icon" />
          <span>TopCare@gmail.com</span>
        </div>

        <div className="contact-item">
          <FaPhoneAlt className="icon" />
          <span> +20 1228770007</span>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
