import Dislike from "../../models/Dislike";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface IDislikeDao {
  findAllUsersThatDislikedTuit (tid: string): Promise<Dislike[]>;
  findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;
  userUnDislikesTuit (tid: string, uid: string): Promise<any>;
  userDislikesTuit (tid: string, uid: string): Promise<Dislike>;
};