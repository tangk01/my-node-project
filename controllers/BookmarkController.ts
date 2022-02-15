/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import IBookmarkController from "../interfaces/Bookmarks/IBookmarkController";

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

  viewBookmarks = (req: Request, res: Response) =>
      BookmarkController.bookmarkDao.viewBookmarks(req.params.uid)
          .then(bookmarks => res.json(bookmarks))

  bookmarkTuit = (req: Request, res: Response) =>
      BookmarkController.bookmarkDao.bookmarkTuit(req.params.uid, req.params.tid)
          .then(bookmarks => res.json(bookmarks))

  unbookmarkTuit = (req: Request, res: Response) =>
      BookmarkController.bookmarkDao.unbookmarkTuit(req.params.uid, req.params.tid)
      .then(bookmarks => res.send(bookmarks))
};