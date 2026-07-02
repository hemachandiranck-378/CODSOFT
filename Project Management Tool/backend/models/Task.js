import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  assignee: {
    type: String,
    default: 'Unassigned',
  },
  deadline: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Task', taskSchema);
