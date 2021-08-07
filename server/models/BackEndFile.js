const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const BackEndSchema = new Schema({
  fileName: {
    type: String,
    required: 'Your file must have a name...',
    minlength: 1,
    maxlength: 30,
    trim: true,
  },
  fileAuthor: {
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
  javascript: {
      type: String,
      required: false,
      default: '',
      trim: true
  }
});

const BackEndFile = model('BackEndFile', BackEndSchema);

module.exports = BackEndFile;