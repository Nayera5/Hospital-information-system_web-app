import React from 'react';
import headerimg from '../pictures/MRI.jpeg';
import './Homepage.css'
import img from '../pictures/Radiology.jpg';
import { color } from 'framer-motion';

const Home = () => {
  return (
    <header>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-lg-8'>
            <h5>We Provide All Health Care Solution</h5>
            <h2>Protect Your Health And Take Care To Of Your Health</h2>
          </div>
        
          <div className='col-lg-4 col-md-4'>
            <img src={headerimg} />
          </div>
          <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

          </div>
          <div className='col-lg-4 col-md-4'>
            <img src={img} />
          </div>
          <div className='col-md-8 col-lg-8'>
            <h1>Radiology Center</h1>
            <br/>
            <h4 >we believe that accurate diagnosis is the first step toward effective treatment. We are proud to offer state-of-the-art medical imaging services, delivered with precision and care by our team of expert radiologists.
             
            </h4>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;