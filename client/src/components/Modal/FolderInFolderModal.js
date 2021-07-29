import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';


import { QUERY_SINGLE_PROJECT} from '../../utils/queries';
import { ADD_FOLDER_TO_FOLDER } from '../../utils/mutations';

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function FolderInFolderModal() {
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


    const [folderName, setFolderName] = useState('')
    const [characterCount, setCharacterCount] = useState(0)

    const { folderID } = useParams()

    const [addFolder, { error }] = useMutation(ADD_FOLDER_TO_FOLDER)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addFolder({
            variables: {
              folderName,
              projectID: folderID,
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

  return (
    <div>
      <button onClick={openModal}>Add Folder</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Folder"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add a folder</h2>
        
        <div>I am a modal</div>
        <form className='addFolderForm' onSubmit={handleFormSubmit}>
                        <div className='formContainer'>
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

export default FolderInFolderModal