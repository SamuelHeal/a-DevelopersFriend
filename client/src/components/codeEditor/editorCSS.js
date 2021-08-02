import {useState} from 'react'
import AceEditor from 'react-ace'
import './codeEditor.css'
// import mode-<language> , this imports the style and colors for the selected language.
import 'ace-builds/src-noconflict/mode-javascript'
// there are many themes to import, I liked monokai.
import 'ace-builds/src-noconflict/theme-monokai'
// this is an optional import just improved the interaction.
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'

function EditorCSS() {
    const [code, setCode] = useState('')


    return (
        <div className='editorContainer'>
            <AceEditor
                style={{
                    height: '300px',
                    width: '100%',
                    minWidth: '200px',
                    borderRadius: '7px',
                    padding: '10px',
                    margin: '10px'
                }}
                placeholder='CSS'
                mode='css'
                theme='monokai'
                name='css'
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

            <a>Save CSS</a>
        </div>
        
        
    )
}

export default EditorCSS