import React, { useState } from 'react';
import Modal from 'react-modal';
import './modal.css'


import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import Auth from '../../utils/auth';



import { ADD_FRONT_END_FILE_TO_FOLDER } from '../../utils/mutations';

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

    const [addFrontEndFileToFolder, { error }] = useMutation(ADD_FRONT_END_FILE_TO_FOLDER)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addFrontEndFileToFolder({
            variables: {
                fileName,
                fileAuthor: Auth.getProfile().data.username,
                projectID: folderID,
                
            },
          });
          setFileName('');
          setCharacterCount(0)
          window.location.reload()
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

  return (
    <div className='modalContainer'>
      <button onClick={openModal}>Add File</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add File"
      >
        <h2>Add a front-end file</h2>
        
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
    </div>
  );
}

export default FrontEndFolderModal