import {useState} from 'react'
import AceEditor from 'react-ace'
import './codeEditor.css'
// import mode-<language> , this imports the style and colors for the selected language.
import 'ace-builds/src-noconflict/mode-javascript'
// there are many themes to import, I liked monokai.
import 'ace-builds/src-noconflict/theme-twilight'
// this is an optional import just improved the interaction.
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'

import { useMutation } from '@apollo/client';
import { UPDATE_JAVASCRIPT_IN_BACKFILE } from '../../utils/mutations';

function EditorBackJS({
    javascript,
    fileID
}) {
    const [code, setCode] = useState(javascript)

    const [updateJS, { error }] = useMutation(UPDATE_JAVASCRIPT_IN_BACKFILE)

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await updateJS({
                variables: {
                  fileID: fileID,
                  javascript: code,
                },
              });
            } catch (err) {
              console.error(err);
            }
        
    }


    return (
        <div className='editorBackContainer'>
            <h5>Javascript</h5>
            <AceEditor
                style={{
                    height: '60vh',
                    width: '60%',
                    minWidth: '200px',
                    borderRadius: '7px',
                    padding: '10px',
                    margin: '10px'
                }}
                placeholder='JAVASCRIPT'
                mode='javascript'
                theme='twilight'
                name='javascript'
                onChange={currentCode => setCode(currentCode)}
                fontSize={15}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 1,
                }}
            />

            <a onClick={handleUpdate}>Save Javascript</a>
        </div>
        
        
    )
}

export default EditorBackJS