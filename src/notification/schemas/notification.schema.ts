import * as mongoose from 'mongoose';

// todo would be best to nest the schema in a user schema
export const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  is_read: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: Number,
    required: true,
  },
});
