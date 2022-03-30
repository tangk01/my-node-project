/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import IDislikeDao from "../interfaces/Dislikes/IDislikeDao";
import DislikeModel from "../mongoose/Dislikes/DislikeModel";
import Dislike from "../models/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements IDislikeDao {
  private static dislikeDao: DislikeDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns DislikeDao
   */
  public static getInstance = (): DislikeDao => {
    if(DislikeDao.dislikeDao === null) {
      DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
  }
  private constructor() {}

  /**
   * Uses DislikeModel to retrieve all users that disliked tuit
   * @param {String} tid Key for tuit that users disliked
   * @returns Promise To be notified when the dislikes are retrieved from
   * database
   */
  findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
      DislikeModel
      .find({tuit: tid})
      .populate("dislikedBy")
      .exec();

  /**
   * Uses DislikeModel to retrieve all tuits that user disliked
   * @param {String} uid Key for user to see tuits from
   * @returns Promise to be notified when the dislikes are retrieved from
   * database
   */
  findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
      DislikeModel
      .find({dislikedBy: uid})
      .populate("tuit")
      .exec();

  /**
   * Inserts dislike instance into database
   * @param {String} uid Key for user disliking tuit
   * @param {String} tid Key for tuit being disliked
   * @returns Promise to be notified when dislike is updated in the database
   */
  userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
      DislikeModel.create({tuit: tid, dislikedBy: uid});

  /**
   * Removes dislike from database
   * @param {String} uid Key for user that disliked tuit
   * @param {String} tid Key for tuit that was disliked
   * @returns Promise to be notified when dislike is removed from database
   */
  userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
      DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

  countHowManyDislikedTuit = async (tid: string): Promise<any> =>
      DislikeModel.count({tuit: tid});

  findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
      DislikeModel.findOne({tuit: tid, dislikedBy: uid});
}