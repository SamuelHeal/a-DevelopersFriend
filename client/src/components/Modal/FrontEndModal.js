import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './modal.css';

import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { QUERY_SINGLE_PROJECT } from '../../utils/queries';
import { ADD_FRONT_END_FILE_TO_PROJECT } from '../../utils/mutations';
import { REMOVE_FRONT_END_FILE } from '../../utils/mutations';

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
  const [currentFiles, setFiles] = useState([]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [fileName, setFileName] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const { projectID } = useParams();

  const [addFrontEndFile, { addError }] = useMutation(
    ADD_FRONT_END_FILE_TO_PROJECT
  );
  const [removeFrontFile, { removeError }] = useMutation(REMOVE_FRONT_END_FILE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newFile = [];

    try {
      const { data } = await addFrontEndFile({
        variables: {
          fileName,
          fileAuthor: Auth.getProfile().data.username,
          projectID,
        },
      });
      newFile.push(...currentFiles);
      newFile.push(data.addFrontEndFileToProject);
      setFileName('');
      setCharacterCount(0);
      setFiles(newFile);
      closeModal();
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
    variables: { projectID: projectID },
  });

  const projects = data?.project || {};

  useEffect(() => {
    if (data) {
      setFiles(projects.frontEndFiles);
    }
  }, [data, loading]);

  const deleteFrontFile = async (fileID) => {
    try {
      const { data } = await removeFrontFile({
        variables: {
          filter: fileID,
          projectID: projectID,
        },
      });

      const newArray = [];

      for (let i = 0; i < currentFiles.length; i++) {
        if (currentFiles[i]._id !== fileID) {
          newArray.push(currentFiles[i]);
        }
      }

      setFiles(newArray);
    } catch (err) {
      console.error(err);
    }
  };

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
        contentLabel='Add File'
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
          <p
            className={`characterCount ${
              characterCount === 30 || addError ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/30
          </p>
          <button className='button' type='submit'>
            Add Folder
          </button>
          {addError && <div className='errorMessage'>{addError.message}</div>}
        </form>
        <a className='modalFrontClose' onClick={closeModal}>
          x
        </a>
      </Modal>
      {currentFiles &&
        currentFiles.map((file) => {
          return (
            <div key={file._id} className='folderDiv'>
              <div className='folderHeader'>
                <a
                  className='closeButtonFolder'
                  onClick={() => {
                    deleteFrontFile(file._id);
                  }}
                >
                  <i className='fi-rr-cross-small'></i>
                </a>
              </div>
              <Link className='link' to={`/frontfile/${file._id}`}>
                <i className='fi-rr-folder icon'></i>
                <h3>{file.fileName}</h3>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default FrontEndModal;
