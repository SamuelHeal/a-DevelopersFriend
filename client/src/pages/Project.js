import React from 'react'
import './Project.css'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROJECT} from '../utils/queries';
import { ADD_FOLDER_TO_PROJECT } from '../utils/mutations';


import FolderList from '../components/fileLists/FolderList'


const SingleProject = () => {
    const { projectID } = useParams()

    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectID: projectID }
    })

    const projects = data?.project || {};

    // const folders = projects.folders
    // const variable = "test"

    // function printFolders() {
    //     for (let i = 0; i <= folders.length; i++) {
    //         return (
    //             <div>
    //                 <h1>{folders[i].folderName}</h1>
    //             </div>
    //         )
    //     }
    // }

    // console.log(folders)

    // function test() {
    //     folders.map((folder) => {
    //         console.log(folder.folderName)
    //         console.log(folder._id)
    //         return (
    //             <div>
    //                 <h1>{folder.folderName}</h1>
    //             </div>
    //         )
    //     })
    // }

    // console.log(test())

    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='projectContainer'> 
            <div className='fileContainer'>
                <h3>Folders</h3>
                <div className='files'>
                    <a className='addBtn'>Add Folder</a>
                    <FolderList folders={projects.folders}/>

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
    


export default SingleProject
