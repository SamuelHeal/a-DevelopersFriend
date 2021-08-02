import React from 'react'
import './BackEnd.css'

import EditorBackJS from '../components/codeEditor/editorBackJS'

import { QUERY_BACK_END_FILE } from '../utils/queries'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

function BackEnd() {

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
            <div className='backEditorContainer'>
                <EditorBackJS javascript={data.backEndFile.javascript} fileID={fileID}/>
            </div>
        </div>
    )
}

export default BackEnd
