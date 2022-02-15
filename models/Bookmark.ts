/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits
 */
import User from "./User";
import Tuit from "./Tuit";

/**
 * @typedef Follow Represents follows relationship between two users
 * @property {Tuit} bookmarkedTuit Tuit which got bookmarked
 * @property {User} bookmarkedUser User who bookmarked
 */

export default interface Follow {
  bookmarkedTuit: Tuit,
  bookmarkedUser: User
};