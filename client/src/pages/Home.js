import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
  return (
    <main className='homeContainer'>
      <h1>aDevelopersFriend</h1>
      <Link to='/login'>
        <span>
          <a className='spanA'></a>
        </span>
      </Link>
      <Link to='/signup'>
        <span>
          <a className='spanB'></a>
        </span>
      </Link>
    </main>
  );
};

export default Home;
