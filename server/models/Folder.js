const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const folderSchema = new Schema({
  folderName: {
    type: String,
    required: 'Your folder must have a name...',
    minlength: 1,
    maxlength: 30,
    trim: true,
  },
  folderAuthor: {
    type: String,
    required: true,
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
      type: Schema.Types.ObjectId,
      ref: 'FrontEndFile'
    },
  ],
  backEndFiles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BackEndFile'
    },
  ],
});

const Folder = model('Folder', folderSchema);

module.exports = Folder;