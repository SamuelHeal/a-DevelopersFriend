import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const refresh = (event) => {
    event.preventDefault()
    window.location.replace(`/me`)
  }
  return (
    <header className="headerContainer">
      <div className="container flex-row justify-space-between-lg justify-space-between-md justify-center align-center">
        <div>
          <Link className='link' to="/">
            <h1 className="title">aDevelopersFriend</h1>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to="/me">
                <button className="headerButton" onClick={refresh}>Projects</button>
              </Link>
              <button className="headerButton" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="headerButton" to="/login">
                Login
              </Link>
              <Link className="headerButton" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
