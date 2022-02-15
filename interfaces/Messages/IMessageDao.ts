import Message from "../../models/Message"

/**
 * @file Declares API for message related data access object methods
 */
export default interface IMessageDao {
  sendMessage (uid1: string, uid2: string, message: Message): Promise<Message>;
  viewSentMessage (uid: string): Promise<Message[]>;
  viewReceivedMessage (uid: string): Promise<Message[]>;
  deleteMessage (mid: string): Promise<any>;
};