import React, { useEffect, useState } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { ADD_PROJECT } from '../utils/mutations';

import { QUERY_ME } from '../utils/queries';

import { REMOVE_PROJECT } from '../utils/mutations';

import './Profile.css';
import '../components/projectList/projectList.css';

import Auth from '../utils/auth';

const Profile = () => {
  const [currentProjects, setProjects] = useState([]);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME);
  const [removeProject, { removeError }] = useMutation(REMOVE_PROJECT);

  const user = data?.me || {};

  useEffect(() => {
    if (!currentProjects.length) {
      if (data) {
        setProjects(data.me.projects);
      }
    }
  }, [data, loading]);

  const [projectName, setProjectName] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addProject, { error }] = useMutation(ADD_PROJECT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newProject = [];

    try {
      const { data } = await addProject({
        variables: {
          projectName,
          projectAuthor: Auth.getProfile().data.username,
        },
      });

      newProject.push(...currentProjects);
      newProject.push(data.addProject);
      setProjectName('');
      setCharacterCount(0);
      setProjects(newProject);
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

  const deleteProject = async (projectID) => {
    try {
      const { data } = await removeProject({
        variables: { filter: projectID },
      });

      const newArray = [];

      for (let i = 0; i < currentProjects.length; i++) {
        if (currentProjects[i]._id !== projectID) {
          newArray.push(currentProjects[i]);
        }
      }

      setProjects(newArray);
    } catch (err) {
      console.error(err);
    }
  };

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to='/me' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <h4>Please Login or Signup to view and create your projects!</h4>;
  }

  return (
    <div>
      <h2 className='headingContainer'>
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
                      placeholder='Project Name'
                      value={projectName}
                      className='projectInput'
                      onChange={handleChange}
                    ></input>
                  </div>
                  <p
                    className={`characterCount ${
                      characterCount === 30 || error ? 'text-danger' : ''
                    }`}
                  >
                    Character Count: {characterCount}/30
                  </p>
                  <div>
                    <button className='button' type='submit'>
                      Add Project
                    </button>
                  </div>
                  {error && <div className='errorMessage'>{error.message}</div>}
                </form>
              </>
            ) : (
              <p>
                Please Login or Signup
                <Link to='/login'>login</Link> or{' '}
                <Link to='/signup'>signup.</Link>
              </p>
            )}
          </div>
        )}

        <div className='mainListContainer'>
          <div className='listContainer'>
            {currentProjects &&
              currentProjects.map((project) => (
                <div key={project._id} className='collectionCard'>
                  <a
                    className='closeButton'
                    onClick={() => {
                      deleteProject(project._id);
                    }}
                  >
                    <i className='fi-rr-cross-small'></i>
                  </a>
                  <Link className='link' to={`/projects/${project._id}`}>
                    <div className='cardHeader'>
                      <p className='createdText'>
                        Created on {project.createdAt}
                      </p>
                    </div>

                    <div className='cardBody'>
                      <h2>{project.projectName}</h2>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
