import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      projectName
      projectAuthor
      createdAt
    }
  }
`

export const QUERY_SINGLE_PROJECT = gql`
  query getSingleProject($projectID: ID!) {
    project(projectID: $projectID) {
      _id
      projectName
      projectAuthor
      createdAt
      folders {
        folderName
      }
      frontEndFiles {
        fileName
      }
      backEndFiles {
        fileName
      }
    }
  }
`
