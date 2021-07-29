import React, { useState} from 'react'
import './Folder.css'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';


import { QUERY_SINGLE_FOLDER} from '../utils/queries';

import FolderList from '../components/fileLists/FolderList'
import FolderInFolderModal from '../components/Modal/FolderInFolderModal';
import FrontEndFileList from '../components/fileLists/FrontEndFileList';


function Folders() {

    const { folderID } = useParams()

    const { loading, data } = useQuery(QUERY_SINGLE_FOLDER, {
        variables: { folderID: folderID }
    })

    const folders = data?.folder || {};    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='projectContainer'> 
            <div className='fileContainer'>
                <h3>Folders</h3>
                <div className='files'>
                    <FolderInFolderModal />
                    <div className='theFolders'>
                        <FolderList folders={folders.folders}/>
                    </div>
                    

                </div>

            </div>
            <div className='fileContainer'>
                <h3>Front End Files</h3>
                <div className='files'>
                    
                    <div className='theFolders'>
                        <FrontEndFileList folders={folders.frontEndFiles}/>
                    </div>
                </div>
                
            </div>
            <div className='fileContainer'>
                <h3>Back End Files</h3>
                <div className='files'>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Folders
