/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import IBookmarkDao from "../interfaces/Bookmarks/IBookmarkDao";
import BookmarkModel from "../mongoose/Bookmarks/BookmarkModel";
import Bookmark from "../models/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Likes
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements IBookmarkDao {
  private static bookmarkDao: BookmarkDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns BookmarkDao
   */
  public static getInstance = (): BookmarkDao => {
    if(BookmarkDao.bookmarkDao === null) {
      BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
  }
  private constructor() {}

  /**
   * Inserts bookmark instance into database
   * @param {String} uid Key for user bookmarking tuit
   * @param {String} tid Key for tuit being bookmarked
   * @returns Promise to be notified when bookmark is updated
   * in the database
   */
  bookmarkTuit = async (uid: string, tid: string): Promise<Bookmark> =>
      BookmarkModel.create({bookmarkedTuit: tid, bookmarkedUser: uid})

  /**
   * Removes bookmark from database
   * @param {String} uid Key for user bookmarking tuit
   * @param {String} tid Key for tuit being bookmarked
   * @returns Promise to be notified when bookmark is removed
   * from database
   */
  unbookmarkTuit = async (uid: string, tid: string): Promise<any> =>
      BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedUser: uid})

  /**
   * Uses BookmarkModel to retrieve all bookmarks
   * @param {String} uid Key for user to retrieve bookmarks from
   * @returns Promise To be notified when the bookmarks are retrieved from
   * database
   */
  viewBookmarks = async (uid: string): Promise<Bookmark[]> =>
      BookmarkModel
      .find({bookmarkedUser: uid})
      .populate("bookmarkedTuit")
      .exec();
}