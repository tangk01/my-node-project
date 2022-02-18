/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import IFollowController from "../interfaces/Follows/IFollowController";

/**
 * @class FollowController Implements RESTful Web Service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *   <li>GET /followers/:uid to retrieve all user's followers
 *   </li>
 *   <li>GET /following/:uid to retrieve all user's following
 *   </li>
 *   <li>POST /users/:uid1/follows/:uid2 to record that user1 followed user2
 *   </li>
 *   <li>DELETE /users/:uid1/follows/:uid2 to record that user1 unfollowed user2
 *   </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followcontroller Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements IFollowController {
  private static followDao: FollowDao = FollowDao.getInstance();
  private static followController: FollowController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): FollowController => {
    if(FollowController.followController === null) {
      FollowController.followController = new FollowController();
      app.get("/followers/:uid", FollowController.followController.viewFollowers);
      app.get("/following/:uid", FollowController.followController.viewFollowing);
      app.post("/users/:uid1/follows/:uid2", FollowController.followController.followUser);
      app.delete("/users/:uid1/follows/:uid2", FollowController.followController.unfollowUser);
    }
    return FollowController.followController;
  }

  private constructor() {}

  /**
   * Retrieves all user's followers from database
   * @param {Request} req Represents request from client, including
   * the path parameter uid representing the user
   * @param {Response} res Represents response to client, including
   * the body formatted as a JSON arrays containing the user objects that follow the user
   */
  viewFollowers = (req: Request, res: Response) =>
      FollowController.followDao.viewFollowers(req.params.uid)
          .then(follows => res.json(follows))

  /**
   * Retrieves all user's following from database
   * @param {Request} req Represents request from client, including
   * the path parameter uid representing the user
   * @param {Response} res Represents response to client, including
   * the body formatted as a JSON arrays containing the user objects that the user follow
   */
  viewFollowing = (req: Request, res: Response) =>
      FollowController.followDao.viewFollowing(req.params.uid)
      .then(follows => res.json(follows))

  /**
   * Records that a user followed another user
   * @param {Request} req Represents request from client, including
   * the path parameter uid1 and uid2 representing the user who is following
   * and the user being followed
   * @param {Response} res Represents response to client, including
   * the body formatted as a JSON containing the new follow that was
   * inserted in the database
   */
  followUser = (req: Request, res: Response) =>
      FollowController.followDao.followUser(req.params.uid1, req.params.uid2)
      .then(follows => res.json(follows))

  /**
   * Records that a user unfollowed another user
   * @param {Request} req Represents request from client, including
   * the path parameter uid1 and uid2 representing the user who is following
   * and the user being followed
   * @param {Response} res Represents response to client, including
   * status on whether or not deleting the follow was successful
   */
  unfollowUser = (req: Request, res: Response) =>
      FollowController.followDao.unfollowUser(req.params.uid1, req.params.uid2)
      .then(follows => res.send(follows))
};