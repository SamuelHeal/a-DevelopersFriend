import React from 'react';
import { Link } from 'react-router-dom';

import './projectList.css'
import { useMutation } from '@apollo/client';



import { REMOVE_PROJECT } from '../../utils/mutations';

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
        return (
            <div className='noProjects'>
                <h1>No projects yet</h1>
            </div>
        )
    }
    else{
        return (
            <div className='listContainer'>
                {showTitle && <h3>{title}</h3>}
                {projects && projects.map((project) => (
                    
                    <div key={project._id} className='collectionCard'>
                        <Link className='link' to={`/projects/${project._id}`}>
                        {showUsername ? (
                            <div className='cardHeader'>
                                <Link to={`/profiles/${project.projectAuthor}`}>
                                    <p className='createdText'>Created on {project.createdAt}</p>
                                </Link>
                            </div>
                        ) : (
                            <div className='cardHeader'>
                                <p className='createdText'>Created on {project.createdAt}</p>
                                <a className='closeButton' onClick={() => {
                                    deleteProject(project._id);
                                    window.location.reload()
                                    
                                    }}>
                                    <i className="fi-rr-cross-small"></i>
                                </a>
                            </div>
                        )}
                        <div className='cardBody'>
                            <h2>{project.projectName}</h2>
                        </div>  
                        </Link>            
                    </div>
                    
                ))}
            </div>
        )
    }

    
}

export default ProjectList;