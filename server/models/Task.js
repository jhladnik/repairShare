const mongoose = require('mongoose');

//Creation of tasks
const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not Completed', 'Completed'],
  },
  phaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phase',
  },
});

module.exports = mongoose.model('Task', TaskSchema);