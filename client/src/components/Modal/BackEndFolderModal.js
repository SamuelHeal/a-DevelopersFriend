import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './modal.css'

import { useQuery } from '@apollo/client';

import { useParams, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


import { QUERY_SINGLE_FOLDER} from '../../utils/queries';
import { ADD_BACK_END_FILE_TO_FOLDER } from '../../utils/mutations';
import { REMOVE_BACK_END_FILE_FROM_FOLDER } from '../../utils/mutations';


import Auth from '../../utils/auth';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function FrontEndFolderModal() {
  const [currentFiles, setFiles] = useState([]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

    const [fileName, setFileName] = useState('')
    const [characterCount, setCharacterCount] = useState(0)

    const { folderID } = useParams()

    const [addBackEndFileToFolder, { error }] = useMutation(ADD_BACK_END_FILE_TO_FOLDER)
    const [removeBackFileFromFolder, { removeError }] = useMutation(REMOVE_BACK_END_FILE_FROM_FOLDER)


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const newFile = []

    
        try {
          const { data } = await addBackEndFileToFolder({
            variables: {
                fileName,
                fileAuthor: Auth.getProfile().data.username,
                projectID: folderID,
                
            },
          });
          newFile.push(...currentFiles)
          newFile.push(data.addBackEndFileToFolder)
          setFileName('');
          setCharacterCount(0)
          setFiles(newFile)
          closeModal()
        } catch (err) {
          console.error(err);
        }
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'fileName' && value.length <= 30) {
            setFileName(value);
          setCharacterCount(value.length);
        }
      };

      const { loading, data } = useQuery(QUERY_SINGLE_FOLDER, {
        variables: { folderID: folderID }
    })

    const folders = data?.folder.backEndFiles || {};   


    useEffect(() => {

      if (data) {
        setFiles(folders)
      }
      
    }, [data, loading]);

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

  return (
    <div className='modalContainer'>
      <button onClick={openModal}>Add File</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add File"
      >
        <h2>Add a back-end file</h2>
        
        <form onSubmit={handleFormSubmit}>
            <div>
                <input 
                name='fileName' 
                placeholder='File Name'
                value={fileName}
                className='projectInput'
                onChange={handleChange}
                ></input>
            </div>
            <p className={`characterCount ${characterCount === 30 || error ? 'text-danger' : ''}`}>
            Character Count: {characterCount}/30
            </p>
                <button className='buttonModal' type='submit'>
                    Add Folder
                </button>
            {error && (
            <div className="errorMessage">
                {error.message}
            </div>
            )}
        </form>
        <a className='modalFrontClose' onClick={closeModal}>x</a>
      </Modal>
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
    </div>
  );
}

export default FrontEndFolderModal