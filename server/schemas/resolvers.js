const { AuthenticationError } = require('apollo-server-express');
const { User, Project, Folder } = require('../models');
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
      return Project.find(params).sort({ createdAt: -1 })
    },
    project: async (parent, { projectID }) => {
      return Project.findOne({ _id: projectID})
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
    addProject: async (parent, { projectName, projectAuthor }) => {
      const project = await Project.create({
        projectName,
        projectAuthor
      });

      await User.findOneAndUpdate(
        { username: projectAuthor},
        { $addToSet: { projectName, projects: project._id } }
      );

      return project;
    }
    // addProject: async (parent, { projectName }, context) => {
    //   if (context.user) {
    //     const project = await Project.create({
    //       projectName,
    //       projectAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { projects: project._id } }
    //     );

    //     return project;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // addFrontEndFile: async (parent, { projectID, fileName }, context) => {
      // if (context.user) {
      //   return Project.findOneAndUpdate(
      //     { _id: projectID },
      //     {
      //       $addToSet: {
      //         frontEndFiles: { fileName },
      //       },
      //     },
      //     {
      //       new: true,
      //       runValidators: true,
      //     }
      //   );
      // }
      // throw new AuthenticationError('You need to be logged in!');
  //     return Project.findOneAndUpdate(
  //       { _id: projectID },
  //       {
  //         $addToSet: {
  //           frontEndFiles: { fileName },
  //         },
  //       },
  //       {
  //         new: true,
  //         runValidators: true,
  //       }
  //     );
  //   },
  //   addBackEndFile: async (parent, { projectID, fileName}, context) => {
  //     if (context.user) {
  //       return Project.findOneAndUpdate(
  //         { _id: projectID },
  //         {
  //           $addToSet: {
  //             backEndFiles: { fileName },
  //           },
  //         },
  //         {
  //           new: true,
  //           runValidators: true,
  //         }
  //       );
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  //   removeProject: async (parent, { projectID }, context) => {
  //     if (context.user) {
  //       const project = await Project.findOneAndDelete({
  //         _id: projectID,
  //         projectAuthor: context.user.username,
  //       });

  //       await User.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { projects: project._id } }
  //       );

  //       return project;
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
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
