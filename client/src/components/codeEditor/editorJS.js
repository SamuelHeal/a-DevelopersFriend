import { useState } from 'react';
import AceEditor from 'react-ace';
import './codeEditor.css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

import { useMutation } from '@apollo/client';
import { UPDATE_JAVASCRIPT_IN_FRONTFILE } from '../../utils/mutations';

function EditorJS({ javascript, fileID }) {
  const [code, setCode] = useState(javascript);

  const [updateJS, { error }] = useMutation(UPDATE_JAVASCRIPT_IN_FRONTFILE);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateJS({
        variables: {
          fileID: fileID,
          javascript: code,
        },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='editorContainer'>
      <h5>Javascript</h5>

      <AceEditor
        style={{
          height: '300px',
          width: '100%',
          minWidth: '200px',
          borderRadius: '7px',
          padding: '10px',
          margin: '10px',
        }}
        placeholder='JAVASCRIPT - does not render'
        mode='javascript'
        theme='twilight'
        name='javascript'
        onChange={(currentCode) => setCode(currentCode)}
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
  );
}

export default EditorJS;
