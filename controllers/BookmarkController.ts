/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import IBookmarkController from "../interfaces/Bookmarks/IBookmarkController";

/**
 * @class TuitController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/bookmark to retrieve all user's bookmarks
 *     </li>
 *     <li>POST /users/:uid/bookmark/:tid to record that a user bookmarked a tuit
 *     </li>
 *     <li>DELETE /users/:uid/bookmark/:tid to record that a user unbookmarked a tuit
 *     </li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements IBookmarkController {
  private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
  private static bookmarkController: BookmarkController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): BookmarkController => {
    if(BookmarkController.bookmarkController === null) {
      BookmarkController.bookmarkController = new BookmarkController();
      app.get("/users/:uid/bookmark", BookmarkController.bookmarkController.viewBookmarks);
      app.post("/users/:uid/bookmark/:tid", BookmarkController.bookmarkController.bookmarkTuit);
      app.delete("/users/:uid/bookmark/:tid", BookmarkController.bookmarkController.unbookmarkTuit);
    }
    return BookmarkController.bookmarkController;
  }

  private constructor() {}

  /**
   * Retrieves all user's bookmarks from database
   * @param {Request} req Represents request from client, including
   * the path parameter uid representing the user
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were bookmarked
   */
  viewBookmarks = (req: Request, res: Response) =>
      BookmarkController.bookmarkDao.viewBookmarks(req.params.uid)
          .then(bookmarks => res.json(bookmarks))

  /**
   * Records that the user bookmarked the tuit
   * @param {Request} req Represents request from client, including
   * the path parameter uid and tid representing the user bookmarking
   * and the tuit being bookmarked
   * @param {Response} res Represents response to client, including
   * the body formatted as JSON containing the new bookmark that was
   * inserted in the database
   */
  bookmarkTuit = (req: Request, res: Response) =>
      BookmarkController.bookmarkDao.bookmarkTuit(req.params.uid, req.params.tid)
          .then(bookmarks => res.json(bookmarks))

  /**
   * Records that the user unbookmarked the tuit
   * @param {Request} req Represents request from client, including
   * the path parameter uid and tid representing the user unbookmarking
   * and the tuit being unbookmarked
   * @param {Response} res Represents response to client, including
   * status on whether or not deleting the bookmark was successful
   */
  unbookmarkTuit = (req: Request, res: Response) =>
      BookmarkController.bookmarkDao.unbookmarkTuit(req.params.uid, req.params.tid)
      .then(bookmarks => res.send(bookmarks))
};