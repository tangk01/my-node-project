/**
 * @file Controller RESTful Web service API for message resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import IMessageController from "../interfaces/Messages/IMessageController";

export default class MessageController implements IMessageController {
  private static messageDao: MessageDao = MessageDao.getInstance();
  private static messageController: MessageController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): MessageController => {
    if(MessageController.messageController === null) {
      MessageController.messageController = new MessageController();
      app.get("/users/:uid/message", MessageController.messageController.viewSentMessage);
      app.get("/message/:uid", MessageController.messageController.viewReceivedMessage);
      app.post("/users/:uid1/message/:uid2", MessageController.messageController.sendMessage);
      app.delete("/message/mid", MessageController.messageController.deleteMessage);
    }
    return MessageController.messageController;
  }

  private constructor() {}

  viewSentMessage = (req: Request, res: Response) =>
      MessageController.messageDao.viewSentMessage(req.params.uid)
          .then(messages => res.json(messages))

  viewReceivedMessage = (req: Request, res: Response) =>
      MessageController.messageDao.viewReceivedMessage(req.params.uid)
          .then(messages => res.json(messages))

  sendMessage = (req: Request, res: Response) =>
      MessageController.messageDao.sendMessage(req.params.uid1, req.params.uid2, req.body)
          .then(messages => res.json(messages))

  deleteMessage = (req: Request, res: Response) =>
      MessageController.messageDao.deleteMessage(req.params.mid)
          .then(messages => res.send(messages))
};