import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import './Login.css';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className='loginContainer'>
      <div className='secondLoginContainer'>
        <div className=''>
          <h4 className=''>Login</h4>
          <div className=''>
            {data ? (
              <p>
                Success! You may now head <Link to='/me'>to your profile.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className='form-input'
                  placeholder='Your email'
                  name='email'
                  type='email'
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className='form-input'
                  placeholder='******'
                  name='password'
                  type='password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className='loginButton'
                  style={{ cursor: 'pointer' }}
                  type='submit'
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className='my-3 p-3 bg-danger text-white'>
                {error.message}
              </div>
            )}
          </div>
          <Link className='signupButton2' to='/signup'>
            Sign Up
          </Link>
        </div>
      </div>
      <div className='signupContainer'>
        <div>
          <h4>Sign Up</h4>
          <p>Begin your journey with us by clicking the button below</p>
          <Link className='signupButton' to='/signup'>
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
