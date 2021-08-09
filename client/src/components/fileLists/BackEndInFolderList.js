import React, { useState, useEffect } from 'react'


import { Link, useParams } from 'react-router-dom';


import { useMutation } from '@apollo/client';


import { REMOVE_BACK_END_FILE_FROM_FOLDER } from '../../utils/mutations';

function FrontEndInFolderList({ files = [] }) {

    const [currentFiles, setFiles] = useState([])


    const [removeBackFileFromFolder, { error }] = useMutation(REMOVE_BACK_END_FILE_FROM_FOLDER)
    
    const { folderID } = useParams()

    useEffect(() => {

        if (files.length) {
          setFiles(files)
        
        }
      }, [files]);
    
    
    const deleteBackFileFromFolder = async (fileID) => {
        try {
            const { data } = await removeBackFileFromFolder({
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
                                    deleteBackFileFromFolder(file._id);                                    
                                    }}>
                                    <i className="fi-rr-cross-small"></i>
                                </a>
                    </div> 
                    <Link className='link' to={`/folderbackfile/${file._id}`}>

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
