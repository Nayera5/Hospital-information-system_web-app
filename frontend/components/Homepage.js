import React from 'react';
import headerimg from '../pictures/hospital.png';
import './Homepage.css'
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
        </div>
      </div>
    </header>
  );
}

export default Home;