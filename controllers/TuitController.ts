import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
  app: Express
  tuitDao: TuitDao

  constructor(app: Express, tuitDao: TuitDao) {
    this.app = app;
    this.tuitDao = tuitDao;
    this.app.get('/tuit', this.findAllTuits);
    this.app.get('/tuit/:tuitid', this.findTuitById);
    this.app.get('/tuit/:userid', this.findTuitsByUser);
    this.app.post('/tuit', this.createTuit);
    this.app.delete('/tuit/:tuidtid', this.deleteTuit);
    this.app.put('/tuit/:tuitid', this.updateTuit);
  }

  findAllTuits = (req: Request, res: Response) =>
      this.tuitDao.findAllTuits()
      .then(tuits => res.json(tuits))
  findTuitById = (req: Request, res: Response) =>
      this.tuitDao.findTuitById(req.params.tuitid)
      .then(tuit => res.json(tuit))
  findTuitsByUser = (req: Request, res: Response) =>
      this.tuitDao.findTuitsByUser(req.params.userid)
      .then(tuit => res.json(tuit))
  createTuit = (req: Request, res: Response) =>
      this.tuitDao.createTuit(req.body)
      .then(tuit => res.json(tuit))
  deleteTuit = (req: Request, res: Response) =>
      this.tuitDao.deleteTuit(req.params.tuitid)
      .then(status => res.json(status))
  updateTuit = (req: Request, res: Response) =>
      this.tuitDao.updateTuit(req.params.tuitid, req.body)
      .then(tuit => res.json(tuit))
}