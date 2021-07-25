const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const folderSchema = new Schema({
  folderName: {
    type: String,
    required: 'Your project must have a name...',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  projectID: {
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
    }
  ],
  frontEndFiles: [
    {
      fileName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      html: {
        type: String,
        required: false,
      },
      css: {
        type: String,
        required: false,
      },
      javascript: {
        type: String,
        required: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  backEndFiles: [
    {
      fileName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      javascript: {
        type: String,
        required: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Folder = model('Folder', folderSchema);

module.exports = Folder;