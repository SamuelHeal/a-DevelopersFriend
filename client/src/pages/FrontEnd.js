import React from 'react'
import './FrontEnd.css'
import EditorJS from '../components/codeEditor/editorJS'
import EditorHTML from '../components/codeEditor/editorHTML';
import EditorCSS from '../components/codeEditor/editorCSS';

import { QUERY_FRONT_END_FILE } from '../utils/queries'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

function FrontEnd() {

    const { fileID } = useParams()

    const { loading, data } = useQuery(QUERY_FRONT_END_FILE, {
        variables: { fileID }
    })

    if (loading) {
        return (
            <h1>loading...</h1>
        )
    }

    return (
        <div className="frontEndContainer">
            <div className='codeEditorContainer'>
                <EditorHTML html={data.frontEndFile.html} fileID={fileID}/>
                <EditorCSS css={data.frontEndFile.css} fileID={fileID}/>
                <EditorJS javascript={data.frontEndFile.javascript} fileID={fileID}/>

            </div>
            
        </div>
    )
}

export default FrontEnd
