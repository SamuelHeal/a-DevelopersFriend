import React from 'react'
import { Redirect, Link } from 'react-router-dom';


import './Project.css'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_SINGLE_PROJECT} from '../utils/queries';


import FolderModal from '../components/Modal/FolderModal'
import FrontEndModal from '../components/Modal/FrontEndModal'
import BackEndModal from '../components/Modal/BackEndModal'

import Auth from '../utils/auth';


const SingleProject = () => {

    const username = Auth.getProfile().data.username

    const { projectID } = useParams()


    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectID: projectID }
    })

    const projects = data?.project || {};

    const refresh = async (event) => {
        event.preventDefault()
        window.location.replace('/me')
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    if (username !== projects.projectAuthor){
        return <Redirect to="/me" />;
    }


    return (
        <div className='projectContainer'> 
        <div className='backDiv'>
        <Link className='projectBackLink' to='/me'>
                <button onClick={refresh}>Back</button>
            </Link>
        </div>
            
            <h3 className='projectName'>{projects.projectName}</h3>
            <div className='fileContainer'>
                <h3>Folders</h3>
                <div className='files'>
                    <FolderModal />
                </div>

            </div>
            <div className='fileContainer'>
                <h3>Front End Files</h3>
                <div className='files'>
                    <FrontEndModal />      
                </div>
                
            </div>
            <div className='fileContainer'>
                <h3>Back End Files</h3>
                <div className='files'>
                    <BackEndModal />
                    
                </div>
                
            </div>
        </div>
    )
}
    


export default SingleProject
