import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './modal.css';

import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { QUERY_SINGLE_FOLDER } from '../../utils/queries';
import { ADD_FOLDER_TO_FOLDER } from '../../utils/mutations';
import { REMOVE_FOLDER } from '../../utils/mutations';

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

function FolderInFolderModal() {
  const [currentFolders, setFolders] = useState([]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [folderName, setFolderName] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const { folderID } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_FOLDER, {
    variables: { folderID: folderID },
  });

  const folders = data?.folder.folders || {};

  useEffect(() => {
    if (data) {
      setFolders(folders);
    }
  }, [data, loading]);

  const [addFolder, { error }] = useMutation(ADD_FOLDER_TO_FOLDER);
  const [removeFolder, { removeError }] = useMutation(REMOVE_FOLDER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newFolder = [];

    try {
      const { data } = await addFolder({
        variables: {
          folderName,
          folderAuthor: Auth.getProfile().data.username,
          projectID: folderID,
        },
      });
      newFolder.push(...currentFolders);
      newFolder.push(data.addFolderToFolder);
      setFolderName('');
      setCharacterCount(0);
      setFolders(newFolder);
      closeModal();
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

  const deleteFolder = async (folderID) => {
    try {
      const { data } = await removeFolder({
        variables: { filter: folderID },
      });

      const newArray = [];

      for (let i = 0; i < currentFolders.length; i++) {
        if (currentFolders[i]._id !== folderID) {
          newArray.push(currentFolders[i]);
        }
      }

      setFolders(newArray);
    } catch (err) {
      console.error(err);
    }
  };

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
        contentLabel='Add Folder'
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
          <p
            className={`characterCount ${
              characterCount === 30 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/30
          </p>
          <button className='button' type='submit'>
            Add Folder
          </button>
          {error && <div className='errorMessage'>{error.message}</div>}
        </form>
        <a className='modalClose' onClick={closeModal}>
          x
        </a>
      </Modal>
      {currentFolders &&
        currentFolders.map((folder) => {
          return (
            <div key={folder._id} name={folder._id} className='folderDiv'>
              <div className='folderHeader'>
                <a
                  className='closeButtonFolder'
                  onClick={() => {
                    deleteFolder(folder._id);
                  }}
                >
                  <i className='fi-rr-cross-small'></i>
                </a>
              </div>
              <Link className='link' to={`/folder/${folder._id}`}>
                <i className='fi-rr-folder icon'></i>
                <h3>{folder.folderName}</h3>
              </Link>
            </div>
          );
        })}{' '}
    </div>
  );
}

export default FolderInFolderModal;
