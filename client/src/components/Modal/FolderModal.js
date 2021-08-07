import React, { useState } from 'react';
import Modal from 'react-modal';
import './modal.css'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';


import { QUERY_SINGLE_PROJECT} from '../../utils/queries';
import { ADD_FOLDER_TO_PROJECT } from '../../utils/mutations';

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

function FolderModal() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

    const [folderName, setFolderName] = useState('')
    const [characterCount, setCharacterCount] = useState(0)

    const { projectID } = useParams()

    const [addFolder, { error }] = useMutation(ADD_FOLDER_TO_PROJECT)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addFolder({
            variables: {
              folderName,
              folderAuthor: Auth.getProfile().data.username,
              projectID: projectID,
            },
          });
          setFolderName('');
          setCharacterCount(0)
          window.location.reload()
        } catch (err) {
          console.error(err);
        }
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'folderName' && value.length <= 30) {
            setFolderName(value);
          setCharacterCount(value.length);
        }
      };

    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectID: projectID }
    })    

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div className='modalContainer'>
      <button onClick={openModal}>Add Folder</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Folder"
      >
        <h2>Add a folder</h2>
        
            <form onSubmit={handleFormSubmit}>
            <div>
                <input 
                name='folderName' 
                placeholder='Folder Name'
                value={folderName}
                className='projectInput'
                onChange={handleChange}
                ></input>
            </div>
            <p className={`characterCount ${characterCount === 30 || error ? 'text-danger' : ''}`}>
            Character Count: {characterCount}/30
            </p>
            
            <button type='submit'>
                Add Folder
            </button>
            
            {error && (
            <div className="errorMessage">
                {error.message}
            </div>
            )}
        </form>
        <a className='modalClose' onClick={closeModal}>x</a>
      </Modal>
    </div>
  );
}

export default FolderModal