const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const frontEndSchema = new Schema({
  fileName: {
    type: String,
    required: 'Your file must have a name...',
    minlength: 1,
    maxlength: 30,
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
  html: {
      type: String,
      required: false,
      default: '',
      trim: true
  },
  css: {
      type: String,
      required: false,
      default: '',
      trim: true
  },
  javascript: {
      type: String,
      required: false,
      default: '',
      trim: true
  }
});

const FrontEndFile = model('FrontEndFile', frontEndSchema);

module.exports = FrontEndFile;