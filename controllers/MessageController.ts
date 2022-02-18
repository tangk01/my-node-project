/**
 * @file Controller RESTful Web service API for message resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import IMessageController from "../interfaces/Messages/IMessageController";

/**
 * @class MessageController Implements RESTful Web service API for message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *   <li> GET /users/:uid/message to retrieve all messages sent by a user
 *   </li>
 *   <li> GET /message/:uid to retrieve all messages sent to a user
 *   </li>
 *   <li> POST /users/:uid1/message/:uid2 to record that a user sent a message to another user
 *   </li>
 *   <li> DELETE /message/:mid to record that a message was deleted
 *   </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
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
      app.delete("/message/:mid", MessageController.messageController.deleteMessage);
    }
    return MessageController.messageController;
  }

  private constructor() {}

  /**
   * Retrieves all messages sent by user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  viewSentMessage = (req: Request, res: Response) =>
      MessageController.messageDao.viewSentMessage(req.params.uid)
          .then(messages => res.json(messages))

  /**
   * Retrieves all messages received by user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  viewReceivedMessage = (req: Request, res: Response) =>
      MessageController.messageDao.viewReceivedMessage(req.params.uid)
          .then(messages => res.json(messages))

  /**
   * Records a new message
   * @param {Request} req Represents request from client, including the path
   * parameter uid1 and uid2 representing the user sending the message and the
   * user receiving the message, alongside the body containing the JSON object
   * for the new message
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new message that was inserted
   * into the database
   */
  sendMessage = (req: Request, res: Response) =>
      MessageController.messageDao.sendMessage(req.params.uid1, req.params.uid2, req.body)
          .then(messages => res.json(messages))

  /**
   * Records that a message was deleted
   * @param {Request} req Represents request from client, including the path
   * parameter mid representing the message being deleted
   * @param {Response} res Represents response to client, including the
   * status on whether deleting the message was successful or not
   */
  deleteMessage = (req: Request, res: Response) =>
      MessageController.messageDao.deleteMessage(req.params.mid)
          .then(messages => res.send(messages))
};