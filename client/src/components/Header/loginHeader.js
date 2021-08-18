import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import Auth from '../../utils/auth';

const LoginHeader = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className='headerContainer'>
      <div className='container flex-row justify-space-between-lg justify-center align-center'>
        <div>
          <Link className='link' to='/'>
            <h1 className='title'>aDevelopersFriend</h1>
          </Link>
          <p className='m-0'>Who needs memory?</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className='headerButton' to='/me'>
                Projects
              </Link>
              <button className='headerButton' onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className='headerButton' to='/'>
                Home
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
