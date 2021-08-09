import React from 'react'
import './Folder.css'
import { Redirect, Link } from 'react-router-dom';

import '../components/fileLists/FolderList.css'


import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_SINGLE_FOLDER } from '../utils/queries';

import Auth from '../utils/auth';


import FolderInFolderModal from '../components/Modal/FolderInFolderModal';
import FrontEndFolderModal from '../components/Modal/FrontEndFolderModal'
import BackEndFolderModal from '../components/Modal/BackEndFolderModal';


function Folders() {

    const username = Auth.getProfile().data.username;

    const { folderID } = useParams()

    const { loading, data } = useQuery(QUERY_SINGLE_FOLDER, {
        variables: { folderID: folderID }
    })

    const folders = data?.folder || {};   
    
    const refresh = async (event) => {
        event.preventDefault()
        window.location.replace(`/projects/${folders.projectID}`)
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (username !== folders.folderAuthor){
        return <Redirect to="/me" />;
    }

    return (
        
        <div className='projectContainer'> 
            <Link className='folderBackLink'to={`/projects/${folders.projectID}`}>
                <button onClick={refresh}>Back</button>
            </Link>
            <h3 className='projectName'>{folders.folderName}</h3>
            <div className='fileContainer'>
                <h3>Folders</h3>
                <div className='files'>
                    <FolderInFolderModal />
                </div>

            </div>
            <div className='fileContainer'>
                <h3>Front End Files</h3>
                <div className='files'>
                    <FrontEndFolderModal />
                </div>
                
            </div>
            <div className='fileContainer'>
                <h3>Back End Files</h3>
                <div className='files'>
                    <BackEndFolderModal />
                    
                </div>
                
            </div>
        </div>
    )
}

export default Folders
