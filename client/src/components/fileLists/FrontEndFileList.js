import React, { useState, useEffect } from 'react'


import { Link, useParams } from 'react-router-dom';


import { useMutation } from '@apollo/client';


import { REMOVE_FRONT_END_FILE } from '../../utils/mutations';

function FrontEndFileList({ files = [] }) {

    const [currentFiles, setFiles] = useState([])


    const [removeFrontFile, { error }] = useMutation(REMOVE_FRONT_END_FILE)
    
    const { projectID } = useParams()
    
    useEffect(() => {

        if (files.length) {
          setFiles(files)
        
        }
      }, [files]);
    
    const deleteFrontFile = async (fileID) => {
        try {
            const { data } = await removeFrontFile({
                variables: { 
                    filter: fileID,
                    projectID: projectID
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
                                    deleteFrontFile(file._id);
                                    
                                    }}>
                                    <i className="fi-rr-cross-small"></i>
                                </a>
                    </div> 
                    <Link className='link' to={`/frontfile/${file._id}`}>

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

export default FrontEndFileList
