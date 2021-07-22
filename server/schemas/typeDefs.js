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
    frontEndFiles: [FrontEnd]!
    backEndFiles: [BackEnd]!
  }

  type Folder {
    _id: ID
    folderName: String
    folderID: ID!
    createdAt: String
    folders: [Folder]!
    frontEndFiles: [FrontEnd]!
    backEndFiles: [BackEnd]!
  }

  type FrontEnd {
    _id: ID
    fileName: String
    html: String
    css: String
    javascript: String
    createdAt: String
  }

  type BackEnd {
    _id: ID
    fileName: String
    javascript: String
    createdAt: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    projects(username: String): [Project]
    project(projectID: ID!): Project
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(projectName: String!, projectAuthor: String!): Project
    addFrontEndFile(projectID: ID!, fileName: String!): FrontEnd
    addBackEndFile(projectID: ID!, fileName: String!): BackEnd
    removeProject(projectID: ID!): Project
    removeFrontEnd(projectID: ID!, fileID: ID!): Project
    removeBackEnd(projectID: ID!, fileID: ID!): Project
  }
`;

module.exports = typeDefs;
