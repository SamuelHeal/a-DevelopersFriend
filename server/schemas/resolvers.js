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
        return User.findOne({ _id: context.user._id }).populate('projects').sort({ createdAt: -1 });
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
    },
    frontEndFile: async (parent, { fileID }) => {
      return FrontEndFile.findOne({ _id: fileID })
    },
    backEndFile: async (parent, { fileID }) => {
      return BackEndFile.findOne({ _id: fileID })
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
        throw new AuthenticationError('No user found with these credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('No user found with these credentials');
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
    addFolderToProject: async (parent, { folderName, folderAuthor, projectID }, context) => {
      
      if (context.user) {
        const folder = await Folder.create({
          folderName,
          folderAuthor,
          projectID,
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
    addFolderToFolder: async (parent, { folderName, folderAuthor, projectID }, context) => {
      if (context.user) {
        const folder = await Folder.create({
          folderName,
          folderAuthor,
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

    addFrontEndFileToProject: async(parent, { projectID, fileAuthor, fileName }, context) => {
    if (context.user) {
      const file = await FrontEndFile.create({
        fileName,
        fileAuthor,
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
    addFrontEndFileToFolder: async(parent, { projectID, fileAuthor, fileName }, context) => {
      if (context.user) {
        const file = await FrontEndFile.create({
          fileName,
          fileAuthor,
          projectID,
        })
  
        await Folder.findOneAndUpdate(
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

      return file
    }

      throw new AuthenticationError('You need to be logged in!');

  },
  removeFrontEndFileFromFolder: async(parent, { fileID, projectID }, context) => {
    if (context.user) {
      const file = await FrontEndFile.findOneAndDelete({
        fileID
      })

      await Folder.findOneAndUpdate(
        { _id: projectID },
        { $pull: { frontEndFiles: fileID}}
      )

      return file
    }

      throw new AuthenticationError('You need to be logged in!');

  },

    
  addBackEndFileToProject: async(parent, { projectID, fileAuthor, fileName }, context) => {
    if (context.user) {
      const file = await BackEndFile.create({
        fileName,
        fileAuthor,
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

    addBackEndFileToFolder: async(parent, { projectID, fileAuthor, fileName }, context) => {
      if (context.user) {
        const file = await BackEndFile.create({
          fileName,
          fileAuthor,
          projectID,
        })
  
        await Folder.findOneAndUpdate(
          { _id: projectID },
          { $addToSet: { backEndFiles: file._id }}
        )
  
          return file
        }
        throw new AuthenticationError('You need to be logged in!');
  
      },

    removeBackEndFile: async(parent, { fileID, projectID }, context) => {
      if (context.user) {
        const file = await BackEndFile.findOneAndDelete({
          fileID
        })
  
        await Project.findOneAndUpdate(
          { _id: projectID },
          { $pull: { backEndFiles: fileID}}
        )
  
        return file
      }
  
        throw new AuthenticationError('You need to be logged in!');
  
    },
    removeBackEndFileFromFolder: async(parent, { fileID, projectID }, context) => {
      if (context.user) {
        const file = await BackEndFile.findOneAndDelete({
          fileID
        })
  
        await Folder.findOneAndUpdate(
          { _id: projectID },
          { $pull: { backEndFiles: fileID}}
        )
  
        return file
      }
  
        throw new AuthenticationError('You need to be logged in!');
  
    },

    updateHTMLInFile: async(parent, { fileID, html }, context) => {
      await FrontEndFile.findOneAndUpdate(
        { _id: fileID },
        { $set: { html: html}},
        { new: true } 
        )
    },
    updateCSSInFile: async(parent, { fileID, css }, context) => {
      await FrontEndFile.findOneAndUpdate(
        { _id: fileID },
        { $set: { css: css}},
        { new: true } 
        )
    },
    updateJSInFrontEndFile: async(parent, { fileID, javascript }, context) => {
      await FrontEndFile.findOneAndUpdate(
        { _id: fileID },
        { $set: { javascript: javascript}},
        { new: true } 
        )
    },
    updateJSInBackEndFile: async(parent, { fileID, javascript }, context) => {
      await BackEndFile.findOneAndUpdate(
        { _id: fileID },
        { $set: { javascript: javascript}},
        { new: true } 
        )
    },


  },
};

module.exports = resolvers;
