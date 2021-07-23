import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PROJECT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const AddNewProject = () => {
    const [projectName, setProjectName] = useState('')
    const [characterCount, setCharacterCount] = useState(0)

    const [addProject, { error }] = useMutation(ADD_PROJECT)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addProject({
            variables: {
              projectName,
              projectAuthor: Auth.getProfile().data.username,
            },
          });
          setProjectName('');
          setCharacterCount(0)
          window.location.reload()
        } catch (err) {
          console.error(err);
        }
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'projectName' && value.length <= 30) {
          setProjectName(value);
          setCharacterCount(value.length);
        }
      };

      return (
          <div>
              <h2>Add a new collection</h2>

              {Auth.loggedIn() ? (
                  <>
                    <p className={`characterCount ${characterCount === 30 || error ? 'text-danger' : ''}`}>
                        Character Count: {characterCount}/30
                    </p>
                    <form className='addProjectForm' onSubmit={handleFormSubmit}>
                        <div>
                            <input 
                            name='projectName' 
                            placeholder='Collection Name'
                            value={projectName}
                            className='projectInput'
                            onChange={handleChange}
                            ></input>
                        </div>
                        <div>
                            <button className='button' type='submit'>
                                Add Collection
                            </button>
                        </div>
                        {error && (
                        <div className="errorMessage">
                            {error.message}
                        </div>
                        )}
                    </form>
                  </>
              ) : (
                <p>
                You need to be logged in to share your thoughts. Please{' '}
                <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
              </p>
              )}
          </div>
      )
}

export default AddNewProject