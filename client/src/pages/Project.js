import React from 'react'

import './Project.css'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_SINGLE_PROJECT} from '../utils/queries';


import FolderList from '../components/fileLists/FolderList'
import FolderModal from '../components/Modal/FolderModal'
import FrontEndFileList from '../components/fileLists/FrontEndFileList'
import FrontEndModal from '../components/Modal/FrontEndModal'


const SingleProject = () => {

    const { projectID } = useParams()


    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectID: projectID }
    })

    const projects = data?.project || {};
    

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className='projectContainer'> 
            <div className='fileContainer'>
                <h3>Folders</h3>
                <div className='files'>
                    <div>
                        <FolderModal />
                    </div>

                    <FolderList folders={projects.folders}/>

                    

                </div>

            </div>
            <div className='fileContainer'>
                <h3>Front End Files</h3>
                <div className='files'>
                    <div>
                        <FrontEndModal />
                    </div>
                    <FrontEndFileList files={projects.frontEndFiles} />
                    
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
