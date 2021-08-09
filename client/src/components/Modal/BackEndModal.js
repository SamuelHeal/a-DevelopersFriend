import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import './modal.css'


import BackEndFileList from '../fileLists/BackEndFileList'

import { QUERY_SINGLE_PROJECT} from '../../utils/queries';
import { ADD_BACK_END_FILE_TO_PROJECT} from '../../utils/mutations';

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

function BackEndModal() {
  const [currentFiles, setFiles] = useState({});

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

    const [addBackEndFile, { error }] = useMutation(ADD_BACK_END_FILE_TO_PROJECT)

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const newFile = []

    
        try {
          const { data } = await addBackEndFile({
            variables: {
              fileName,
              fileAuthor: Auth.getProfile().data.username,
              projectID: projectID,
            },
          });
          newFile.push(...currentFiles)
          newFile.push(data.addBackEndFileToProject)
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

    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectID: projectID }
    })    

    const projects = data?.project || {};

    console.log(projects)

    useEffect(() => {

      if (data) {
  
        setFiles(projects.backEndFiles)
  
      }
      
    }, [data, loading]);

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
      <BackEndFileList files={currentFiles} />

    </div>
  );
}

export default BackEndModal