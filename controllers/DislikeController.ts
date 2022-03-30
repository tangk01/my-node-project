/**
 * @file Controller RESTful Web service API for dislikes resource
 */
import {Express, Request, Response} from "express";
import DislikeDao from "../daos/DislikeDao";
import TuitDao from "../daos/TuitDao";
import IDislikeController from "../interfaces/Dislikes/IDislikeController";

/**
 * @class TuitController Implements RESTful Web service API for dislikes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/dislikes to retrieve all the tuits disliked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/dislikes to retrieve all users that disliked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/dislikes/:tid to record that a user dislikes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/undislikes/:tid to record that a user
 *     no longer dislikes a tuit
 *     </li>
 * </ul>
 * @property {DislikeDao} dislikeDao Singleton DAO implementing likes CRUD operations
 * @property {DislikeController} dislikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikeController implements IDislikeController {
  private static dislikeDao: DislikeDao = DislikeDao.getInstance();
  private static tuitDao  = new TuitDao();
  private static dislikeController: DislikeController | null = null;

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): DislikeController => {
    if(DislikeController.dislikeController === null) {
      DislikeController.dislikeController = new DislikeController();
      app.get("/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
      app.get("/tuits/:tid/dislikes", DislikeController.dislikeController.findAllUsersThatDislikedTuit);
      app.post("/users/:uid/dislikes/:tid", DislikeController.dislikeController.userDislikesTuit);
      app.delete("/users/:uid/undislikes/:tid", DislikeController.dislikeController.userUnDislikesTuit);
      app.put("/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
    }
    return DislikeController.dislikeController;
  }

  private constructor() {}

  /**
   * Retrieves all users that disliked a tuit from the database
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the disliked tuit
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
      DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
      .then(dislikes => res.json(dislikes));

  /**
   * Retrieves all tuits disliked by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user disliked the tuits
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were disliked
   */
  findAllTuitsDislikedByUser = (req: Request, res: Response) =>
      DislikeController.dislikeDao.findAllTuitsDislikedByUser(req.params.uid)
      .then(dislikes => res.json(dislikes));

  /**
   * Records that a user disliked a tuit
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is disliking the tuit
   * and the tuit being disliked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new dislikes that was inserted in the
   * database
   */
  userDislikesTuit = (req: Request, res: Response) =>
      DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
      .then(dislikes => res.json(dislikes));

  /**
   * Records that a user undisliked a tuit
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is undisliking
   * the tuit and the tuit being undisliked
   * @param {Response} res Represents response to client, including status
   * on whether deleting the dislike was successful or not
   */
  userUnDislikesTuit = (req: Request, res: Response) =>
      DislikeController.dislikeDao.userUnDislikesTuit(req.params.uid, req.params.tid)
      .then(status => res.send(status));



  userTogglesTuitDislikes = async (req: Request, res: Response) => {
    const dislikeDao = DislikeController.dislikeDao;
    const tuitDao = DislikeController.tuitDao;
    const uid = req.params.uid;
    const tid = req.params.tid;
    // @ts-ignore
    const profile = req.session['profile'];
    const userId = uid === "my" && profile ?
        profile._id : uid;
    try {
      const userAlreadyDislikedTuit = await dislikeDao.findUserDislikesTuit(userId, tid);
      const howManyDislikedTuit = await dislikeDao.countHowManyDislikedTuit(tid);
      let tuit = await tuitDao.findTuitById(tid);
      if (userAlreadyDislikedTuit) {
        await dislikeDao.userUnDislikesTuit(userId, tid);
        tuit.stats.dislikes = howManyDislikedTuit - 1;
      } else {
        await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
        tuit.stats.dislikes = howManyDislikedTuit + 1;
      };
      await tuitDao.updateDislikes(tid, tuit.stats);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  }
};