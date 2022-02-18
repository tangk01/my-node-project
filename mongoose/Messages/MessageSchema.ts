import mongoose, {Schema} from "mongoose";
import Message from "../../models/Message";

/**
 * @typedef Message Represents a message between users
 * @property {String} message The message that was sent/received
 * @property {ObjectId} to User ID who received message
 * @property {ObjectId} from User ID who sent message
 * @property {Date} sentOn Date message was sent
 */
const MessageSchema = new mongoose.Schema<Message>({
  message: {type: String, required: true},
  to: {type: Schema.Types.ObjectId, ref: "UserModel"},
  from: {type: Schema.Types.ObjectId, ref: "UserModel"},
  sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema