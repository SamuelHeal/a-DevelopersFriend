import React, { useState } from 'react';
import Modal from 'react-modal';
import './modal.css'


import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';


import { QUERY_SINGLE_PROJECT} from '../../utils/queries';
import { ADD_FRONT_END_FILE_TO_PROJECT} from '../../utils/mutations';

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

function FrontEndModal() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

    const [fileName, setFileName] = useState('')
    const [characterCount, setCharacterCount] = useState(0)

    const { projectID } = useParams()

    const [addFrontEndFile, { error }] = useMutation(ADD_FRONT_END_FILE_TO_PROJECT)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addFrontEndFile({
            variables: {
              fileName,
              fileAuthor: Auth.getProfile().data.username,
              projectID,
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

    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectID: projectID }
    })    

    if (loading) {
        return <div>Loading...</div>;
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
                <button className='button' type='submit'>
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

export default FrontEndModal