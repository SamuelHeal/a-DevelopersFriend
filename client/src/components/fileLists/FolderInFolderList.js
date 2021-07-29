import React from 'react'
import './FolderList.css'
import { Link, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';



import { useMutation } from '@apollo/client';


import { REMOVE_FOLDER_FROM_FOLDER } from '../../utils/mutations';


function FolderList({ folders = [] }) {

    const { projectID } = useParams()


    const [removeFolder, { error }] = useMutation(REMOVE_FOLDER_FROM_FOLDER)

    
    
    const deleteFolder = async (folderID) => {
        try {
            const { data } = await removeFolder({
                variables: { 
                    filter: folderID,
                    projectID: projectID
                }
            })

        } catch (err) {
            console.error(err);
          }
        
    }

    if (!folders.length) {
        return (
            <h3>No Folders Yet</h3>
        )
    }

    return (
        <>
            {folders && folders.map((folder) => {
                return (
                    <div  key={folder._id} className="folderDiv">  
                        <Link className='link' to={`/folder/${folder._id}`}>
                        <div className='folderHeader'>
                        <a className='closeButtonFolder' onClick={() => {
                                    deleteFolder(folder._id, folder.projectID);
                                    window.location.reload()
                                    
                                    }}>
                                    <i className="fi-rr-cross-small"></i>
                                </a>
                    </div> 
                    <i className="fi-rr-folder icon">
                    </i>  
                    <h3>{folder.folderName}</h3>

                    </Link>
                </div>
               
                )
                
            })}
        </>
    )
}

export default FolderList
