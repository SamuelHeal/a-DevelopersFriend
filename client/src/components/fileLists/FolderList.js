import React from 'react'
import './FolderList.css'
import { Link } from 'react-router-dom';


import { useMutation } from '@apollo/client';


import { REMOVE_FOLDER } from '../../utils/mutations';


function FolderList({ folders = [] }) {

    const [removeFolder, { error }] = useMutation(REMOVE_FOLDER)

    
    
    const deleteFolder = async (folderID) => {
        try {
            const { data } = await removeFolder({
                variables: { filter: folderID }
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
                <Link to={`/folder/${folder._id}`}><div key={folder._id} className="folderDiv">  
                    <div className='folderHeader'>
                        <p>Created on {folder.createdAt}</p>
                        <a className='closeButton' onClick={() => {
                                    deleteFolder(folder._id);
                                    window.location.reload()
                                    
                                    }}>
                                    <i className="fi-rr-cross-small"></i>
                                </a>
                    </div> 
                    <i class="fi-rr-folder icon">
                    </i>  
                    <h3>{folder.folderName}</h3>

                    
                </div>
                </Link>
                )
                
            })}
        </>
    )
}

export default FolderList
