import React from 'react'
import './FrontEnd.css'
import useScript from '../components/useScript/useScript'
import EditorJS from '../components/codeEditor/editorJS'
import EditorHTML from '../components/codeEditor/editorHTML';
import EditorCSS from '../components/codeEditor/editorCSS';


function FrontEnd() {
    return (
        <div className="frontEndContainer">
            <div className='codeEditorContainer'>
                <EditorHTML />
                <EditorCSS />
                <EditorJS />

            </div>
            
        </div>
    )
}

export default FrontEnd
