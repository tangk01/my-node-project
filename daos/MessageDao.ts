/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import IMessageDao from "../interfaces/Messages/IMessageDao";
import MessageModel from "../mongoose/Messages/MessageModel";
import Message from "../models/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Likes
 * @property {MessageDao} messageDao Private single instance of LikeDao
 */
export default class MessageDao implements IMessageDao {
  private static messageDao: MessageDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns MessageDao
   */
  public static getInstance = (): MessageDao => {
    if(MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  }
  private constructor() {}

  /**
   * Insert message instance into database
   * @param {String} uid1 Key for user sending message
   * @param {String} uid2 Key for user receiving message
   * @param {Message} message Message Instance to be inserted into database
   * @returns Promise to be notified when message is inserted into database
   */
  sendMessage = async (uid1: string, uid2: string, message: Message): Promise<Message> =>
      MessageModel.create({...message, to: uid2, from: uid1})

  /**
   * Uses MessageModel to retrieve all messages sent by user
   * @param {String} uid Key for user sending messages
   * @returns Promise to be notified when messages are retrieved from database
   */
  viewSentMessage = async (uid: string): Promise<Message[]> =>
      MessageModel
      .find({from: uid})
      .populate("message")
      .exec();

  /**
   * Uses MessageModel to retrieve all messages received by user
   * @param {String} uid Key for user that recieved messages
   * @returns Promise to be notified when messages are retrieved from database
   */
  viewReceivedMessage = async (uid: string): Promise<Message[]> =>
      MessageModel
      .find({to: uid})
      .populate("message")
      .exec();

  /**
   * Removes message from database
   * @param {String} mid Key for message being removed
   * @returns Promise to be notified when message is removed from database
   */
  deleteMessage = async (mid: string): Promise<any> =>
      MessageModel.deleteOne({_id: mid})
}