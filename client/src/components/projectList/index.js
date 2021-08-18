import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './projectList.css';
import { useMutation } from '@apollo/client';

import { REMOVE_PROJECT } from '../../utils/mutations';

const ProjectList = ({
  projects,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  const [currentProjects, setProjects] = useState([]);

  const [removeProject, { error }] = useMutation(REMOVE_PROJECT);

  useEffect(() => {
    if (projects.length) {
      setProjects(projects);
    }
  }, [projects]);

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

  if (!currentProjects.length) {
    return (
      <div className='noProjects'>
        <h1>No projects yet</h1>
      </div>
    );
  } else {
    return (
      <div className='listContainer'>
        {showTitle && <h3>{title}</h3>}
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
                {showUsername ? (
                  <div className='cardHeader'>
                    <p className='createdText'>
                      Created on {project.createdAt}
                    </p>
                  </div>
                ) : (
                  <div className='cardHeader'>
                    <p className='createdText'>
                      Created on {project.createdAt}
                    </p>
                  </div>
                )}
                <div className='cardBody'>
                  <h2>{project.projectName}</h2>
                </div>
              </Link>
            </div>
          ))}
      </div>
    );
  }
};

export default ProjectList;
