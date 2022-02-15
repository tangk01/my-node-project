import User from "./User"

/**
 * @typedef Message Represents a message between two users
 * @property {String} message Message being sent
 * @property {User} to User who is being sent the message
 * @property {User} from User who is receiving the message
 * @property {Date} sentOn Date message was sent
 */
export default interface Message {
  message: String,
  to: User,
  from: User,
  sentOn: Date
};