import IBookmarkDao from "../interfaces/Bookmarks/IBookmarkDao";
import BookmarkModel from "../mongoose/Bookmarks/BookmarkModel";
import Bookmark from "../models/Bookmark";

export default class BookmarkDao implements IBookmarkDao {
  private static bookmarkDao: BookmarkDao | null = null;
  public static getInstance = (): BookmarkDao => {
    if(BookmarkDao.bookmarkDao === null) {
      BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
  }
  private constructor() {}

  bookmarkTuit = async (uid: string, tid: string): Promise<Bookmark> =>
      BookmarkModel.create({bookmarkedTuit: tid, bookmarkedUser: uid})

  unbookmarkTuit = async (uid: string, tid: string): Promise<any> =>
      BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedUser: uid})

  viewBookmarks = async (uid: string): Promise<Bookmark[]> =>
      BookmarkModel
      .find({bookmarkedUser: uid})
      .populate("bookmarkedTuit")
      .exec();
}