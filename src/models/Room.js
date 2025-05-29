import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  usersCount: { type: Number, default: 0 },
  lastActiveAt: { type: Date, default: Date.now },
});

const Room = mongoose.model('Room', RoomSchema);
export default Room;
