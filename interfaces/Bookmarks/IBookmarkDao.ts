import Bookmark from "../../models/Bookmark";

export default interface IBookmarkDao {
  bookmarkTuit(uid: string, tid: string): Promise<Bookmark>;
  unbookmarkTuit(uid: string, tid: string): Promise<any>;
  viewBookmarks(uid: string): Promise<Bookmark[]>;
}