const mongoose = require('mongoose');

//Creation of tasks
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not Completed', 'Completed'],
  },
  //should relate this Task to the Phase
  phaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phase',
  },
});

module.exports = mongoose.model('Task', TaskSchema);