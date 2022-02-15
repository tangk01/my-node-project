/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import IFollowController from "../interfaces/Follows/IFollowController";

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

  viewFollowers = (req: Request, res: Response) =>
      FollowController.followDao.viewFollowers(req.params.uid)
          .then(follows => res.json(follows))

  viewFollowing = (req: Request, res: Response) =>
      FollowController.followDao.viewFollowing(req.params.uid)
      .then(follows => res.json(follows))

  followUser = (req: Request, res: Response) =>
      FollowController.followDao.followUser(req.params.uid1, req.params.uid2)
      .then(follows => res.json(follows))

  unfollowUser = (req: Request, res: Response) =>
      FollowController.followDao.unfollowUser(req.params.uid1, req.params.uid2)
      .then(follows => res.send(follows))
};