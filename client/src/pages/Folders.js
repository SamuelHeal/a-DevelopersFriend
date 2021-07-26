import React, { useState} from 'react'
import './Folder.css'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';


import { QUERY_SINGLE_FOLDER} from '../utils/queries';
import { ADD_FOLDER_TO_FOLDER } from '../utils/mutations';

import FolderList from '../components/fileLists/FolderList'


function Folders() {

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

    const { loading, data } = useQuery(QUERY_SINGLE_FOLDER, {
        variables: { folderID: folderID }
    })

    const folders = data?.folder || {};

    console.log(folders)
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='projectContainer'> 
            <div className='fileContainer'>
                <h3>Folders</h3>
                <div className='files'>
                    <div>
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
                    </div>
                    <div className='theFolders'>
                        <FolderList folders={folders.folders}/>
                    </div>
                    

                </div>

            </div>
            <div className='fileContainer'>
                <h3>Front End Files</h3>
                <div className='files'>
                    
                </div>
                
            </div>
            <div className='fileContainer'>
                <h3>Back End Files</h3>
                <div className='files'>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Folders
