import React from 'react';

import { QUERY_SINGLE_FOLDER } from '../../utils/queries';
import { useQuery } from '@apollo/client';

function FolderInFolderBack({ folderData }) {
  const folderID = folderData.projectID;
  const { loading, data } = useQuery(QUERY_SINGLE_FOLDER, {
    variables: { folderID: folderID },
  });

  const folder = async (event) => {
    event.preventDefault();
    window.location.replace(`/folder/${folderID}`);
  };

  if (loading) {
    return null;
  }

  if (data.folder !== null) {
    return <button onClick={folder}>Back</button>;
  }

  if (data.folder === null) {
    return null;
  }
}

export default FolderInFolderBack;
