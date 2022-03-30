import {Express, Request, Response} from "express";
import DislikeDao from "../daos/DislikeDao";
import TuitDao from "../daos/TuitDao";
import IDislikeController from "../interfaces/Dislikes/IDislikeController";

export default class DislikeController implements IDislikeController {
  private static dislikeDao: DislikeDao = DislikeDao.getInstance();
  private static tuitDao  = new TuitDao();
  private static dislikeController: DislikeController | null = null;

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

  findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
      DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
      .then(dislikes => res.json(dislikes));

  findAllTuitsDislikedByUser = (req: Request, res: Response) =>
      DislikeController.dislikeDao.findAllTuitsDislikedByUser(req.params.uid)
      .then(dislikes => res.json(dislikes));

  userDislikesTuit = (req: Request, res: Response) =>
      DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
      .then(dislikes => res.json(dislikes));

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