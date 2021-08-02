const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [Project]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Project {
    _id: ID
    projectName: String
    projectAuthor: String
    createdAt: String
    folders: [Folder]!
    frontEndFiles: [FrontEndFile]!
    backEndFiles: [BackEndFile]!
  }

  type Folder {
    _id: ID
    folderName: String
    projectID: String
    createdAt: String
    folders: [Folder]!
    frontEndFiles: [FrontEndFile]!
    backEndFiles: [BackEndFile]!
  }

  type FrontEndFile {
    _id: ID
    fileName: String
    projectID: String
    createdAt: String
    html: String
    css: String
    javascript: String
  }

  type BackEndFile {
    _id: ID
    fileName: String
    projectID: String
    createdAt: String
    javascript: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    projects(username: String): [Project]
    project(projectID: ID!): Project
    folder(folderID: ID!): Folder
    frontEndFile(fileID: ID!): FrontEndFile
    backEndFile(fileID: ID!): BackEndFile
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    
    addProject(projectName: String!, projectAuthor: String!): Project
    addFolderToProject(folderName: String!, projectID: ID!): Folder
    addFolderToFolder(folderName: String!, projectID: ID!): Folder
    addFrontEndFileToProject(projectID: ID!, fileName: String!): FrontEndFile
    addFrontEndFileToFolder(projectID: ID!, fileName: String!): FrontEndFile
    addBackEndFileToProject(projectID: ID!, fileName: String!): BackEndFile
    addBackEndFileToFolder(projectID: ID!, fileName: String!): BackEndFile
    
    updateHTMLInFile(fileID: ID!, html: String!): FrontEndFile

    removeProject(projectID: ID!): Project
    removeFolder(folderID: ID!): Folder
    removeFolderFromFolder(folderID: ID!, projectID: ID!): Folder
    removeFrontEndFile(fileID: ID!, projectID: ID!): FrontEndFile
    removeBackEndFile(fileID: ID!, projectID: ID!): BackEndFile
    removeFrontEndFileFromFolder(fileID: ID!, projectID: ID!): FrontEndFile
    removeBackEndFileFromFolder(fileID: ID!, projectID: ID!): BackEndFile


  }
`;

module.exports = typeDefs;
