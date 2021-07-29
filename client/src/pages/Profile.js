import React, { useState, useEffect } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import ProjectList from '../components/projectList/index'
import AddNewProject from '../components/addProject/index'

import { ADD_PROJECT } from '../utils/mutations';

// import './addProject.css'

// import Auth from '../../utils/auth';

import './Profile.css'

import Auth from '../utils/auth';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME);
  
  const user = data?.me || {};  

  const [projectName, setProjectName] = useState('')
  const [characterCount, setCharacterCount] = useState(0)

  
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
          {userParam ? `${user.username}'s` : 'Your'} Collections
      </h2>
      <div className='profileContainer'>
        {!userParam && (
          <div
            className="projectForm"
          >
            <AddNewProject />
          </div>
        )}
        
        <div className='mainListContainer'>
        
          <ProjectList 
            projects={user.projects}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}/>
        </div>
      </div>
    </div>
  );
};

export default Profile;