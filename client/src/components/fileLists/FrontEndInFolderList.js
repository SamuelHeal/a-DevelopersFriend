import React, { useState, useEffect } from 'react'


import { Link, useParams } from 'react-router-dom';


import { useMutation } from '@apollo/client';


import { REMOVE_FRONT_END_FILE_FROM_FOLDER } from '../../utils/mutations';

function FrontEndInFolderList({ files = [] }) {
    const [currentFiles, setFiles] = useState([])

    const [removeFrontFileFromFolder, { error }] = useMutation(REMOVE_FRONT_END_FILE_FROM_FOLDER)
    
    const { folderID } = useParams()

    useEffect(() => {

        if (files.length) {
          setFiles(files)
        
        }
      }, [files]);
    
    
    const deleteFrontFileFromFolder = async (fileID) => {
        try {
            const { data } = await removeFrontFileFromFolder({
                variables: { 
                    filter: fileID,
                    projectID: folderID
                }
            })

            const newArray = []

            for (let i = 0; i < currentFiles.length; i++) {
                if (currentFiles[i]._id !== fileID) {
                    newArray.push(currentFiles[i])

                }
            }
            
            setFiles(newArray)

        } catch (err) {
            console.error(err);
          }
        
    }

    if (!currentFiles.length) {
        return (
            <h3>No Files Yet</h3>
        )
    }
    return (
        <>
            {currentFiles && currentFiles.map((file) => {
                return (
                    <div key={file._id} className="folderDiv">  
                        <div className='folderHeader'>
                        <a className='closeButtonFolder' onClick={() => {
                                    deleteFrontFileFromFolder(file._id);
                                    
                                    }}>
                                    <i className="fi-rr-cross-small"></i>
                                </a>
                    </div> 
                    <Link className='link' to={`/folderfrontfile/${file._id}`}>

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
