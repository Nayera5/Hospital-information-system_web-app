import React from 'react';
import headerimg from '../pictures/MRI.jpeg';
import img from '../pictures/Radiology.jpg';
import './Homepage.css';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <header>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-lg-8'>
            <h2>Protect Your Health And Take Care Of Your Health</h2>
            <h4>We Provide All Health Care Solution</h4>

          </div>

          <div className='col-lg-4 col-md-4' id="space">
            <img src={headerimg} alt='MRI Scanner' className='img-fluid rounded shadow moving-img' />
          </div>
           
          <div className='col-lg-4 col-md-4'>
            <img src={img} alt='Radiology Equipment' className='img-fluid rounded shadow moving-img' />
          </div>

          <div className='col-md-8 col-lg-8'>
            <h1 id="rad">Radiology Center</h1>
            <h4>
              We believe that accurate diagnosis is the first step toward effective treatment.
              We are proud to offer state-of-the-art medical imaging services, delivered with precision
              and care by our team of expert radiologists.
            </h4>
          </div>
        </div>

        {/* Contact Us Section */}
        <div id='contact' className='contact-section'>
          <h2> Contact Us</h2>
          <div className="contact-item">
                    <MdEmail className="icon" />
                    <span>TopCare@gmail.com</span>
                  </div>
          
                  <div className="contact-item">
                    <FaPhoneAlt className="icon" />
                    <span> +20 1228770007</span>

                    </div>
            <div className='contact-item'>
              <i className='fas fa-map-marker-alt'></i>
              <span>Address: Cairo,Egypt</span>
            </div>
          
        </div>
      </div>
    </header>
  );
};

export default Home;
