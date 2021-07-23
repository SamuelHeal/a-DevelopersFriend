import React from 'react';
import { Link } from 'react-router-dom';

import './projectList.css'

import { useMutation } from '@apollo/client';

import { REMOVE_PROJECT } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';

const ProjectList = ({ 
    projects,
    title,
    showTitle = true,
    showUsername = true, }) => {

    
    const [removeProject, { error }] = useMutation(REMOVE_PROJECT)

    const deleteProject = async (projectID) => {
        try {
            const { data } = await removeProject({
                variables: { filter: projectID }
            })
        } catch (err) {
            console.error(err);
          }
    }

    if (!projects.length) {
        return <h1>No projects yet</h1>
    }
    else{
        return (
            <div className='listContainer'>
                {showTitle && <h3>{title}</h3>}
                {projects && projects.map((project) => (
                    <div key={project._id} className='collectionCard'>
                        <h3 className='cardHeader'>
                            {showUsername ? (
                                <Link className='createdText' to={`/profiles/${project.projectAuthor}`}>
                                    <p>Created on {project.createdAt}</p>
                                </Link>
                            ) : (
                                <>
                                    <p>Created on {project.createdAt}</p>
                                </>
                            )}
                        </h3>
                        <div className='cardBody'>
                            <h2>{project.projectName}</h2>
                        </div>
                        {showUsername ? (
                            <div className='buttonContainer'>
                                <Link className='button' to={`/projects/${project._id}`}>
                                    View
                                </Link>
                            </div>
                        ) : (
                            <div className='buttonContainer'>
                                <Link className='button' to={`/projects/${project._id}`}>
                                    View
                                </Link>
                                <a className='button' onClick={() => {deleteProject(project._id)}}>
                                    Delete
                                </a>
                            </div>
                        )}
                        
                    </div>
                ))}
            </div>
        )
    }

    
}

export default ProjectList;