import React from 'react'


import { Link, useParams } from 'react-router-dom';


import { useMutation } from '@apollo/client';


import { REMOVE_FRONT_END_FILE_FROM_FOLDER } from '../../utils/mutations';

function FrontEndInFolderList({ files = [] }) {

    const [removeFrontFileFromFolder, { error }] = useMutation(REMOVE_FRONT_END_FILE_FROM_FOLDER)
    
    const { folderID } = useParams()
    
    
    const deleteFrontFileFromFolder = async (fileID) => {
        try {
            const { data } = await removeFrontFileFromFolder({
                variables: { 
                    filter: fileID,
                    projectID: folderID
                }
            })

        } catch (err) {
            console.error(err);
          }
        
    }

    if (!files.length) {
        return (
            <h3>No Files Yet</h3>
        )
    }
    return (
        <>
            {files && files.map((file) => {
                return (
                    <div key={file._id} className="folderDiv">  
                        <Link className='link' to={`/frontfile/${file._id}`}>
                        <div className='folderHeader'>
                        <a className='closeButtonFolder' onClick={() => {
                                    deleteFrontFileFromFolder(file._id);
                                    window.location.reload()
                                    
                                    }}>
                                    <i className="fi-rr-cross-small"></i>
                                </a>
                    </div> 
                    <i className="fi-rr-folder icon">
                    </i>  
                    <h3>{file.fileName}</h3>

                    </Link>
                </div>
               
                )
                
            })}
        </>
    )
}

export default FrontEndInFolderList
