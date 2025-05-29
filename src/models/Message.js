import { Schema } from "mongoose";

const MessageSchema = new Schema({
  roomName: { type: String, required: true, index: true },
  sender: { type: String, required: true },
  text: { type: String, required: true },
  color: { type: String, default: '#000000' },
  timestamp: { type: Date, default: Date.now, expires: 86400 }  // TTL of 24 hours (86400 seconds)
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;