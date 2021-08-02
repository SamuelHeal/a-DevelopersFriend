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

export const ADD_FRONT_END_FILE_TO_PROJECT = gql`
  mutation addFrontEndFileToProject($projectID: ID!, $fileName: String!) {
    addFrontEndFileToProject(projectID: $projectID, fileName: $fileName) {
      _id
      fileName
      projectID
      createdAt
      html
      css
      javascript
    }
  }
`

export const ADD_FRONT_END_FILE_TO_FOLDER = gql`
  mutation addFrontEndFileToFolder($projectID: ID!, $fileName: String!) {
    addFrontEndFileToFolder(projectID: $projectID, fileName: $fileName) {
      _id
      fileName
      projectID
      createdAt
      html
      css
      javascript
    }
  }
`

export const ADD_BACK_END_FILE_TO_PROJECT = gql`
  mutation addBackEndFileToProject($projectID: ID!, $fileName: String!) {
    addBackEndFileToProject(projectID: $projectID, fileName: $fileName) {
      _id
      fileName
      projectID
      createdAt
      javascript
    }
  }
`

export const ADD_BACK_END_FILE_TO_FOLDER = gql`
  mutation addBackEndFileToFolder($projectID: ID!, $fileName: String!) {
    addBackEndFileToFolder(projectID: $projectID, fileName: $fileName) {
      _id
      fileName
      projectID
      createdAt
      javascript
    }
  }
`



export const REMOVE_FOLDER_FROM_FOLDER = gql`
mutation removeFolderFromFolder($filter: ID!, $projectID: ID!) {
  removeFolder(folderID: $filter, projectID: $projectID) {
    _id
    folderName
    projectID
    createdAt
  }
}
`

export const REMOVE_FRONT_END_FILE = gql`
  mutation removeFrontEndFile($filter: ID!, $projectID: ID!) {
    removeFrontEndFile(fileID: $filter, projectID: $projectID) {
      _id
      fileName
      projectID
      createdAt
      html
      css
      javascript
    }
  }
`

export const REMOVE_FRONT_END_FILE_FROM_FOLDER = gql`
  mutation removeFrontEndFileFromFolder($filter: ID!, $projectID: ID!) {
    removeFrontEndFileFromFolder(fileID: $filter, projectID: $projectID) {
      _id
      fileName
      projectID
      createdAt
      html
      css
      javascript
    }
  }
`

export const REMOVE_BACK_END_FILE = gql`
  mutation removeBackEndFile($filter: ID!, $projectID: ID!) {
    removeBackEndFile(fileID: $filter, projectID: $projectID) {
      _id
      fileName
      projectID
      createdAt
      javascript
    }
  }
`

export const REMOVE_BACK_END_FILE_FROM_FOLDER = gql`
  mutation removeBackEndFileFromFolder($filter: ID!, $projectID: ID!) {
    removeBackEndFileFromFolder(fileID: $filter, projectID: $projectID) {
      _id
      fileName
      projectID
      createdAt
      javascript
    }
  }
`

export const UPDATE_HTML = gql`
  mutation updateHTMLInFile($fileID: ID!, $html: String!) {
    updateHTMLInFile(fileID: $fileID, html: $html) {
      html
    }
  }
`

export const UPDATE_CSS = gql`
  mutation updateCSSInFile($fileID: ID!, $css: String!) {
    updateCSSInFile(fileID: $fileID, css: $css) {
      css
    }
  }
`

export const UPDATE_JAVASCRIPT_IN_FRONTFILE = gql`
  mutation updateJSInFrontEndFile($fileID: ID!, $javascript: String!) {
    updateJSInFrontEndFile(fileID: $fileID, javascript: $javascript) {
      javascript
    }
  }
`

export const UPDATE_JAVASCRIPT_IN_BACKFILE = gql`
  mutation updateJSInBackEndFile($fileID: ID!, $javascript: String!) {
    updateJSInBackEndFile(fileID: $fileID, javascript: $javascript) {
      javascript
    }
  }
`