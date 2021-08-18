import React from 'react';

import { QUERY_SINGLE_PROJECT } from '../../utils/queries';
import { useQuery } from '@apollo/client';

function FolderBack({ projectData }) {
  const projectID = projectData.projectID;
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectID: projectID },
  });

  const project = async (event) => {
    event.preventDefault();
    window.location.replace(`/projects/${projectID}`);
  };

  console.log(data);
  if (loading) {
    return null;
  }

  if (data.project !== null) {
    return <button onClick={project}>Back</button>;
  }

  if (data.project === null) {
    return null;
  }
}

export default FolderBack;
