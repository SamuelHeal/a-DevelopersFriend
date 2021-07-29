const { AuthenticationError } = require('apollo-server-express');
const { User, Project, Folder, FrontEndFile, BackEndFile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('projects');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('projects');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    projects: async (parent, { username }) => {
      const params = username ? {username} : {};
      return Project.find(params).sort({ createdAt: -1 }).populate('folders').populate('frontEndFiles').populate('backEndFiles')
    },
    project: async (parent, { projectID }) => {
      return Project.findOne({ _id: projectID}).populate('folders').populate('frontEndFiles').populate('backEndFiles')
    },
    folder: async (parent, { folderID }) => {
      return Folder.findOne({ _id: folderID }).sort({ createdAt: -1 }).populate('folders').populate('frontEndFiles').populate('backEndFiles')
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addProject: async (parent, { projectName }, context) => {
      if (context.user) {
        const project = await Project.create({
          projectName,
          projectAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { projects: project._id } }
        );

        return project;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeProject: async (parent, { projectID }, context) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectID,
          projectAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { projects: projectID } }
        );

        await Folder.remove(
          { projectID: projectID }
        )

        return project;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addFolderToProject: async (parent, { folderName, projectID }, context) => {
      
      if (context.user) {
        const folder = await Folder.create({
          folderName,
          projectID: projectID
        });

        await Project.findOneAndUpdate(
          { _id: projectID },
          { $addToSet: { folders: folder._id } }
        );

        return folder;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeFolder: async (parent, { folderID }, context) => {
      if (context.user) {
        const folder = await Folder.findOneAndDelete({
          _id: folderID,
        });

        await Project.findOneAndUpdate(
          { projectAuthor: context.username },
          { $pull: { projects: folderID}}
        )
        

        return folder
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addFolderToFolder: async (parent, { folderName, projectID }, context) => {
      if (context.user) {
        const folder = await Folder.create({
          folderName,
          projectID,
        })

        await Folder.findOneAndUpdate(
          { _id: projectID },
          { $addToSet: { folders: folder._id } }
        )

        return folder
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeFolderFromFolder: async (parent, { folderID, projectID }, context) => {
      if (context.user) {
        const folder = await Folder.findOneAndDelete({
          _id: folderID,
        });

        await Folder.findOneAndUpdate(
          { _id: projectID },
          { $pull: { folders: folderID}}
        )
        

        return folder
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addFrontEndFileToProject: async(parent, { projectID, fileName }, context) => {
    if (context.user) {
      const file = await FrontEndFile.create({
        fileName,
        projectID,
      })

      await Project.findOneAndUpdate(
        { _id: projectID },
        { $addToSet: { frontEndFiles: file._id }}
      )

      return file
      }
      throw new AuthenticationError('You need to be logged in!');

    },

    removeFrontEndFile: async(parent, { fileID, projectID }, context) => {
    if (context.user) {
      const file = await FrontEndFile.findOneAndDelete({
        fileID
      })

      await Project.findOneAndUpdate(
        { _id: projectID },
        { $pull: { frontEndFiles: fileID}}
      )

      await Folder.findOneAndUpdate(
        { _id: projectID },
        { $pull: { frontEndFiles: fileID}}
      )

      return file
    }

      throw new AuthenticationError('You need to be logged in!');

  },

    
  addBackEndFileToProject: async(parent, { projectID, fileName }, context) => {
    if (context.user) {
      const file = await BackEndFile.create({
        fileName,
        projectID,
      })

      await Project.findOneAndUpdate(
        { _id: projectID },
        { $addToSet: { backEndFiles: file._id }}
      )

        return file
      }
      throw new AuthenticationError('You need to be logged in!');

    },

  //   removeFrontEnd: async (parent, { projectID, fileID }, context) => {
  //     if (context.user) {
  //       return Project.findOneAndUpdate(
  //         { _id: projectID },
  //         {
  //           $pull: {
  //             frontEndFiles: {
  //               _id: fileID,
  //             },
  //           },
  //         },
  //         { new: true }
  //       );
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  //   removeBackEnd: async (parent, { projectID, fileID }, context) => {
  //     if (context.user) {
  //       return Project.findOneAndUpdate(
  //         { _id: projectID },
  //         {
  //           $pull: {
  //             backEndFiles: {
  //               _id: fileID,
  //             },
  //           },
  //         },
  //         { new: true }
  //       );
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   }
  },
};

module.exports = resolvers;
