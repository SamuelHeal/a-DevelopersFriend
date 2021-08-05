import React from 'react'
import './FrontEnd.css'
import EditorJS from '../components/codeEditor/editorJS'
import EditorHTML from '../components/codeEditor/editorHTML';
import EditorCSS from '../components/codeEditor/editorCSS';
import { Link } from 'react-router-dom';


import { QUERY_FRONT_END_FILE } from '../utils/queries'
import { QUERY_PROJECTS } from '../utils/queries';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

function FrontEndFromFolder() {

    const { fileID } = useParams()

    const { finding, projects } = useQuery(QUERY_PROJECTS)

    const { loading, data } = useQuery(QUERY_FRONT_END_FILE, {
        variables: { fileID }
    })

    console.log(projects)

    if (loading) {
        return (
            <h1>loading...</h1>
        )
    }

    if (finding) {
        return (
            <h1>loading...</h1>
        )
    }

    return (
        <div className="frontEndContainer">
            <Link to={`/folder/${data.frontEndFile.projectID}`}>
                <button>Back</button>
            </Link>
            <h3 className='projectName'>{data.frontEndFile.fileName}</h3>
            <div className='codeEditorContainer'>
                <EditorHTML html={data.frontEndFile.html} fileID={fileID}/>
                <EditorCSS css={data.frontEndFile.css} fileID={fileID}/>
                <EditorJS javascript={data.frontEndFile.javascript} fileID={fileID}/>

            </div>
            
        </div>
    )
}

export default FrontEndFromFolder