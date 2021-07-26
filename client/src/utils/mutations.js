import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($projectName: String!, $projectAuthor: String!) {
    addProject(projectName: $projectName, projectAuthor: $projectAuthor) {
      _id
      projectName
      projectAuthor
      createdAt
    }
  }
`

export const REMOVE_PROJECT = gql`
  mutation removeProject($filter: ID!) {
    removeProject(projectID: $filter) {
      _id
      projectName
      projectAuthor
      createdAt
    }
  }
`
export const ADD_FOLDER_TO_PROJECT = gql`
  mutation addFolderToProject($folderName: String!, $projectID: ID!) {
    addFolderToProject(folderName: $folderName, projectID: $projectID) {
      _id
      folderName
      projectID
      createdAt
    }
  }
`

export const REMOVE_FOLDER = gql`
  mutation removeFolder($filter: ID!) {
    removeFolder(folderID: $filter) {
      _id
      folderName
      projectID
      createdAt
    }
  }
`

export const ADD_FOLDER_TO_FOLDER =gql`
  mutation addFolderToFolder($folderName: String!, $projectID: ID!) {
    addFolderToFolder(folderName: $folderName, projectID: $projectID) {
      _id
      folderName
      projectID
      createdAt
    }
  }
`