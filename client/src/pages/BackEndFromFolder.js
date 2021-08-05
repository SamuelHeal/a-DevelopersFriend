import React from 'react'
import './BackEnd.css'
import { Link } from 'react-router-dom';


import EditorBackJS from '../components/codeEditor/editorBackJS'

import { QUERY_BACK_END_FILE } from '../utils/queries'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

function BackEndFromFolder() {

    const { fileID } = useParams()

    const { loading, data } = useQuery(QUERY_BACK_END_FILE, {
        variables: { fileID }
    })

    if (loading) {
        return (
            <h1>loading...</h1>
        )
    }

    return (
        <div className="backEndContainer">
            <Link to={`/folder/${data.backEndFile.projectID}`}>
                <button>Back</button>
            </Link>
            <h3 className='projectName'>{data.backEndFile.fileName}</h3>
            <div className='backEditorContainer'>
                <EditorBackJS javascript={data.backEndFile.javascript} fileID={fileID}/>
            </div>
        </div>
    )
}

export default BackEndFromFolder
