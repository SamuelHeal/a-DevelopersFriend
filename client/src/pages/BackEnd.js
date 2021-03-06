import React from 'react';
import './BackEnd.css';
import { Redirect, Link } from 'react-router-dom';
import Auth from '../utils/auth';

import EditorBackJS from '../components/codeEditor/editorBackJS';

import { QUERY_BACK_END_FILE } from '../utils/queries';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

function BackEnd() {
  const username = Auth.getProfile().data.username;

  const { fileID } = useParams();

  const { loading, data } = useQuery(QUERY_BACK_END_FILE, {
    variables: { fileID },
  });

  if (loading) {
    return <h1>loading...</h1>;
  }

  const refresh = async (event) => {
    event.preventDefault();
    window.location.replace(`/projects/${data.backEndFile.projectID}`);
  };

  if (username !== data.backEndFile.fileAuthor) {
    return <Redirect to='/me' />;
  }

  return (
    <div className='backEndContainer'>
      <div className='backEndButtonContainer'>
        <Link to={`/projects/${data.backEndFile.projectID}`}>
          <button onClick={refresh}>Back</button>
        </Link>
      </div>

      <h3 className='projectName'>{data.backEndFile.fileName}</h3>
      <div className='backEditorContainer'>
        <EditorBackJS
          javascript={data.backEndFile.javascript}
          fileID={fileID}
        />
      </div>
    </div>
  );
}

export default BackEnd;
