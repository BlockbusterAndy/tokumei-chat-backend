import mongoose from 'mongoose';

const UserSessionSchema = new mongoose.Schema({
  sessionToken: { type: String, required: true, unique: true },  // UUID
  displayName: { type: String, required: true },
  roomName: { type: String, required: true, index: true },
  color: { type: String, default: '#000000' },
  connectedAt: { type: Date, default: Date.now },
  disconnectedAt: Date,  // for logging disconnections if needed
});

const UserSession = mongoose.model('UserSession', UserSessionSchema);
export default UserSession;
