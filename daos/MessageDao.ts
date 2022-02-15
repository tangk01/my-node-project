import IMessageDao from "../interfaces/Messages/IMessageDao";
import MessageModel from "../mongoose/Messages/MessageModel";
import Message from "../models/Message";

export default class MessageDao implements IMessageDao {
  private static messageDao: MessageDao | null = null;
  public static getInstance = (): MessageDao => {
    if(MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  }
  private constructor() {}

  sendMessage = async (uid1: string, uid2: string, message: Message): Promise<Message> =>
      MessageModel.create({...message, to: uid2, from: uid1})

  viewSentMessage = async (uid: string): Promise<Message[]> =>
      MessageModel
      .find({from: uid})
      .populate("message")
      .exec();

  viewReceivedMessage = async (uid: string): Promise<Message[]> =>
      MessageModel
      .find({to: uid})
      .populate("message")
      .exec();

  deleteMessage = async (mid: string): Promise<any> =>
      MessageModel.deleteOne({_id: mid})
}