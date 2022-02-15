/**
 * @file Declares Follow data type representing relationship between
 * users
 */
import User from "./User";

/**
 * @typedef Follow Represents follows relationship between two users
 * @property {User} userFollowed User who is being followed
 * @property {User} userFollowing User who is following
 */

export default interface Follow {
  userFollowed: User,
  userFollowing: User
};