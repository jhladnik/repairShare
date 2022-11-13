const mongoose = require('mongoose');

//Creation of phases
const PhaseSchema = new mongoose.Schema({
  number: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not Completed', 'Completed'],
  },
});

module.exports = mongoose.model('Phase', PhaseSchema);