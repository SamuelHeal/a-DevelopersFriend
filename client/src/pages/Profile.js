import React, { useEffect, useState } from 'react';
import { Redirect, useParams, Link  } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { ADD_PROJECT } from '../utils/mutations';



import { QUERY_ME } from '../utils/queries';

import ProjectList from '../components/projectList/index'



import './Profile.css'

import Auth from '../utils/auth';

const Profile = () => {

  const [currentProjects, setProjects] = useState({});

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME);
  
  const user = data?.me || {};  



  useEffect(() => {

    if (!currentProjects.length) {
      if (data) {
        setProjects(data.me.projects)
      }
    }  
    
  }, [data, loading]);

  const [projectName, setProjectName] = useState('')
    const [characterCount, setCharacterCount] = useState(0)

    const [addProject, { error }] = useMutation(ADD_PROJECT)
   

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const newProject = []
    
        try {
          const { data } = await addProject({
            variables: {
              projectName,
              projectAuthor: Auth.getProfile().data.username,
            },
          });

          newProject.push(...currentProjects)
          newProject.push(data.addProject)
          setProjectName('');
          setCharacterCount(0)
          setProjects(newProject)
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


  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }


  return (
    <div>
      <h2 className="headingContainer">
          {userParam ? `${user.username}'s` : 'Your'} Projects
      </h2>
      <div className='profileContainer'>
        {!userParam && (

        <div className='formContainer'>
        <h2>Add a new project</h2>

        {Auth.loggedIn() ? (
            <>
              <form className='addProjectForm' onSubmit={handleFormSubmit}>
                  <div className='formContainer'>
                      <input 
                      name='projectName' 
                      placeholder='Collection Name'
                      value={projectName}
                      className='projectInput'
                      onChange={handleChange}
                      ></input>
                  </div>
                  <p className={`characterCount ${characterCount === 30 || error ? 'text-danger' : ''}`}>
                  Character Count: {characterCount}/30
                  </p>
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
  
        )}
        
        <div className='mainListContainer'>
        
          <ProjectList 
            projects={currentProjects}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}/>
        </div>
      </div>
    </div>
  );
};

export default Profile;