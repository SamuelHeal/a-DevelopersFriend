const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: 'Your project must have a name...',
    minlength: 1,
    maxlength: 30,
    trim: true,
  },
  projectAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  folders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Folder',
    },
  ],
  frontEndFiles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'FrontEndFile',
    },
  ],
  backEndFiles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BackEndFile',
    },
  ],
});

const Project = model('Project', projectSchema);

module.exports = Project;
