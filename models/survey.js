const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipientSchema = new Schema({
  email: String,
  clicked: { type: Boolean, default: false },
});

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date,
  totalSent: { type: Number }
});

module.exports = mongoose.model('Survey', surveySchema);
