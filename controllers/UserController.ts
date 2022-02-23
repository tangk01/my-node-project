/**
 * @file Controller RESTful Web service API for users resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import IUserController from "../interfaces/Users/IUserController";

/**
 * @class TuitController Implements RESTful Web service API for tuit resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *   <li> GET /users to retrieve all users
 *   </li>
 *   <li> GET /users/:userid to retrieve a specific user
 *   </li>
 *   <li> POST /users to create a new user
 *   </li>
 *   <li> DELETE /users/:userid to delete an existing user
 *   </li>
 *   <li> PUT /users/:userid to modify an existing user
 *   </li>
 * </ul>
 * @property {Express} app Express instance to declare the RESTful Web service API
 * @property {UserDao} userDAo Singleton DAO implementing user CRUD operations
 */
export default class UserController implements IUserController {
  app: Express;
  userDao: UserDao;
  
  constructor(app: Express, userDao: UserDao) {
    this.app = app;
    this.userDao = userDao;
    this.app.get('/users', this.findAllUsers);
    this.app.get('/users/:userid', this.findUserById);
    this.app.post('/users', this.createUser);
    this.app.delete('/users/:userid', this.deleteUser);
    this.app.put('/users/:userid', this.updateUser);
  }

  /**
   * Retrieves all users
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findAllUsers = (req: Request, res: Response) =>
      this.userDao.findAllUsers()
      .then(users => res.json(users));

  /**
   * Retrieves specific user
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user wanted
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the user wanted
   */
  findUserById = (req: Request, res: Response) =>
      this.userDao.findUserById(req.params.userid)
      .then(user => res.json(user));

  /**
   * Creates a new user
   * @param {Request} req Represents request from client, including the body
   * containing the JSON object for the new user
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new user that was inserted
   * into the database
   */
  createUser = (req: Request, res: Response) =>
      this.userDao.createUser(req.body)
      .then(user => res.json(user));

  /**
   * Deletes an existing user
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user
   * @param {Response} res Represents response to client, including
   * status on whether deleting the user was successful or not
   */
  deleteUser = (req: Request, res: Response) =>
      this.userDao.deleteUser(req.params.userid)
      .then(status => res.json(status));

  /**
   * Updates an existing user
   * @param {Request} req Represents request from client, including the path
   * parameter userid representing the existing user, and body containing
   * JSON object to update user
   * @param {Response} res Represents response to client, including
   * status on whether updating the user was successful or not
   */
  updateUser = (req: Request, res: Response) =>
      this.userDao.updateUser(req.params.userid, req.body)
      .then(status => res.json(status));
}