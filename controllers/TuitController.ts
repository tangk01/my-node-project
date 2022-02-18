/**
 * @file Controller RESTful Web service API for tuits resource
 */
import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import ITuitController from "../interfaces/Tuits/ITuitController";

/**
 * @class TuitController Implements RESTful Web service API for tuit resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *   <li> GET /tuits to retrieve all tuits
 *   </li>
 *   <li> GET /tuits/:tid to retrieve a specific tuit
 *   </li>
 *   <li> GET /users/:uid/tuits to retrieve all tuits by user
 *   </li>
 *   <li> POST /users/:uid/tuits to create a new tuit
 *   </li>
 *   <li> DELETE /tuits/:tid to remove an existing tuit
 *   </li>
 *   <li> PUT /tuits/:tid to modify an existing tuit
 *   </li>
 * </ul>
 * @property {Express} app Express instance to declare the RESTful Web service API
 * @property {TuitDao} tuitDAo Singleton DAO implementing tuit CRUD operations
 */
export default class TuitController implements ITuitController {
  app: Express
  tuitDao: TuitDao

  constructor(app: Express, tuitDao: TuitDao) {
    this.app = app;
    this.tuitDao = tuitDao;
    this.app.get('/tuits', this.findAllTuits);
    this.app.get('/tuits/:tid', this.findTuitById);
    this.app.get('/users/:uid/tuits', this.findTuitsByUser);
    this.app.post('/users/:uid/tuits', this.createTuit);
    this.app.delete('/tuits/:tid', this.deleteTuit);
    this.app.put('/tuits/:tid', this.updateTuit);
  }

  /**
   * Retrieves all tuits
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects
   */
  findAllTuits = (req: Request, res: Response) =>
      this.tuitDao.findAllTuits()
      .then(tuits => res.json(tuits))

  /**
   * Retrieves specific tuit
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the tuit wanted
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the tuit wanted
   */
  findTuitById = (req: Request, res: Response) =>
      this.tuitDao.findTuitById(req.params.tid)
      .then(tuit => res.json(tuit))

  /**
   * Retrieves all tuits from specific user
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects
   */
  findTuitsByUser = (req: Request, res: Response) =>
      this.tuitDao.findTuitsByUser(req.params.uid)
      .then(tuit => res.json(tuit))

  /**
   * Creates a new tuit
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user making the tuit as well as the body
   * containing the JSON object for the new tuit
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new tuit that was inserted
   * into the database
   */
  createTuit = (req: Request, res: Response) =>
      this.tuitDao.createTuit(req.params.uid, req.body)
      .then(tuit => res.json(tuit))

  /**
   * Deletes an existing tuit
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the tuit
   * @param {Response} res Represents response to client, including
   * status on whether deleting the tuit was successful or not
   */
  deleteTuit = (req: Request, res: Response) =>
      this.tuitDao.deleteTuit(req.params.tid)
      .then(status => res.json(status))

  /**
   * Updates an existing tuit
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the existing tuit, and body containing
   * JSON object to update tuit
   * @param {Response} res Represents response to client, including
   * status on whether updating the tuit was successful or not
   */
  updateTuit = (req: Request, res: Response) =>
      this.tuitDao.updateTuit(req.params.tid, req.body)
      .then(tuit => res.json(tuit))
}