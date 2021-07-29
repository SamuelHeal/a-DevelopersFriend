import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';


import { QUERY_SINGLE_PROJECT} from '../../utils/queries';
import { ADD_BACK_END_FILE_TO_FOLDER } from '../../utils/mutations';

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
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

    const [fileName, setFileName] = useState('')
    const [characterCount, setCharacterCount] = useState(0)

    const { folderID } = useParams()

    const [addBackEndFileToFolder, { error }] = useMutation(ADD_BACK_END_FILE_TO_FOLDER)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addBackEndFileToFolder({
            variables: {
                fileName,
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
    <div>
      <button onClick={openModal}>Add File</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add File"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add a back-end file</h2>
        
        <div>I am a modal</div>
        <form className='addFileForm' onSubmit={handleFormSubmit}>
            <div className='formContainer'>
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
            <div>
                <button className='button' type='submit'>
                    Add Folder
                </button>
            </div>
            {error && (
            <div className="errorMessage">
                {error.message}
            </div>
            )}
        </form>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}

export default FrontEndFolderModal