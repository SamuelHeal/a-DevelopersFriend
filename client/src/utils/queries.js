import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      projects {
        _id
        projectName
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      projects {
        _id
        projectName
        projectAuthor
        createdAt
      }
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
        _id
        folderName
        createdAt
      }
      frontEndFiles {
        _id
        fileName
        fileAuthor
      }
      backEndFiles {
        _id
        fileName
        fileAuthor
      }
    }
  }
`

export const QUERY_SINGLE_FOLDER = gql`
  query getSingleFolder($folderID: ID!) {
    folder(folderID: $folderID) {
      _id
      folderName
      folderAuthor
      projectID
      createdAt
      folders {
        _id
        folderName
        folderAuthor
        createdAt
      }
      frontEndFiles {
        _id
        fileName
        fileAuthor
        createdAt
      }
      backEndFiles {
        _id
        fileName
        fileAuthor
        createdAt
      }
    }
  }
`

export const QUERY_FRONT_END_FILE = gql`
  query getFrontEndFile($fileID: ID!) {
    frontEndFile(fileID: $fileID) {
      fileName
      fileAuthor
      projectID
      createdAt
      html
      css
      javascript
    }
  }
`

export const QUERY_BACK_END_FILE = gql`
  query getBackEndFile($fileID: ID!) {
    backEndFile(fileID: $fileID) {
      fileName
      fileAuthor
      projectID
      createdAt
      javascript
    }
  }
`