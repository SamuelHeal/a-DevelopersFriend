import React from 'react'


import { Link, useParams } from 'react-router-dom';


import { useMutation } from '@apollo/client';


// import { REMOVE_FRONT_END_FILE } from '../../utils/mutations';

function FrontEndFileList({ files = [] }) {

    // const [removeFile, { error }] = useMutation(REMOVE_FRONT_END_FILE)
    
    // const { projectID } = useParams()
    
    
    // const deleteFile = async (fileID) => {
    //     try {
    //         const { data } = await removeFile({
    //             variables: { 
    //                 filter: fileID,
    //                 projectID: projectID
    //             }
    //         })

    //     } catch (err) {
    //         console.error(err);
    //       }
        
    // }

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
                        <a className='closeButtonFolder'>
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

export default FrontEndFileList
