import React, { useState, useEffect } from 'react'
import './FolderList.css'
import { Link, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';



import { useMutation } from '@apollo/client';


import { REMOVE_FOLDER_FROM_FOLDER } from '../../utils/mutations';


function FolderList({ folders = [] }) {

    const [currentFolders, setFolders] = useState([])


    const { projectID } = useParams()


    const [removeFolder, { error }] = useMutation(REMOVE_FOLDER_FROM_FOLDER)

    useEffect(() => {

        if (folders.length) {
          setFolders(folders)
        
        }
      }, [folders]);

    
    
    const deleteFolder = async (folderID) => {
        try {
            const { data } = await removeFolder({
                variables: { 
                    filter: folderID,
                    projectID: projectID
                }
            })

            const newArray = []

            for (let i = 0; i < currentFolders.length; i++) {
                if (currentFolders[i]._id !== folderID) {
                    newArray.push(currentFolders[i])

                }
            }
            
            setFolders(newArray)

        } catch (err) {
            console.error(err);
          }
        
    }

    if (!currentFolders.length) {
        return (
            <h3>No Folders Yet</h3>
        )
    }

    return (
        <>
            {currentFolders && currentFolders.map((folder) => {
                return (
                    <div  key={folder._id} className="folderDiv">  
                        
                        <div className='folderHeader'>
                        <a className='closeButtonFolder' onClick={() => {
                                    deleteFolder(folder._id, folder.projectID);                                    
                                    }}>
                                    <i className="fi-rr-cross-small"></i>
                                </a>
                    </div> 
                    <Link className='link' to={`/folder/${folder._id}`}>
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
