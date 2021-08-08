import React from 'react'
import { Redirect, Link } from 'react-router-dom';


import './Project.css'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_SINGLE_PROJECT} from '../utils/queries';


import FolderList from '../components/fileLists/FolderList'
import FolderModal from '../components/Modal/FolderModal'
import FrontEndFileList from '../components/fileLists/FrontEndFileList'
import FrontEndModal from '../components/Modal/FrontEndModal'
import BackEndFileList from '../components/fileLists/BackEndFileList'
import BackEndModal from '../components/Modal/BackEndModal'

import Auth from '../utils/auth';


const SingleProject = () => {

    const username = Auth.getProfile().data.username

    const { projectID } = useParams()


    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectID: projectID }
    })

    const projects = data?.project || {};



    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (username !== projects.projectAuthor){
        return <Redirect to="/me" />;
    }


    return (
        <div className='projectContainer'> 
            <Link className='projectBackLink'to='/me'>
                <button>Back</button>
            </Link>
            <h3 className='projectName'>{projects.projectName}</h3>
            <div className='fileContainer'>
                <h3>Folders</h3>
                <div className='files'>
                    <FolderModal />
                    <div className='fileBorder'>
                        <FolderList folders={projects.folders}/>

                    </div>
                </div>

            </div>
            <div className='fileContainer'>
                <h3>Front End Files</h3>
                <div className='files'>
                    <FrontEndModal />
                    <div className='fileBorder'>
                        <FrontEndFileList files={projects.frontEndFiles}/>

                    </div>
                    
                </div>
                
            </div>
            <div className='fileContainer'>
                <h3>Back End Files</h3>
                <div className='files'>
                    <BackEndModal />
                    <div className='fileBorder'>
                    <BackEndFileList files={projects.backEndFiles} />
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}
    


export default SingleProject
