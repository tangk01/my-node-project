/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import ILikeDao from "../interfaces/Likes/ILikeDao";
import LikeModel from "../mongoose/Likes/LikeModel";
import Like from "../models/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements ILikeDao {
  private static likeDao: LikeDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns LikeDao
   */
  public static getInstance = (): LikeDao => {
    if(LikeDao.likeDao === null) {
      LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
  }
  private constructor() {}

  /**
   * Uses LikeModel to retrieve all users that liked tuit
   * @param {String} tid Key for tuit that users liked
   * @returns Promise To be notified when the likes are retrieved from
   * database
   */
  findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
      LikeModel
      .find({tuit: tid})
      .populate("likedBy")
      .exec();

  /**
   * Uses LikeModel to retrieve all tuits that user liked
   * @param {String} uid Key for user to see tuits from
   * @returns Promise to be notified when the likes are retrieved from
   * database
   */
  findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
      LikeModel
      .find({likedBy: uid})
      .populate({
        path: "tuit",
        populate: {
          path: "postedBy"
        }
      })
      .exec();


  /**
   * Inserts like instance into database
   * @param {String} uid Key for user liking tuit
   * @param {String} tid Key for tuit being liked
   * @returns Promise to be notified when like is updated in the database
   */
  userLikesTuit = async (uid: string, tid: string): Promise<any> =>
      LikeModel.create({tuit: tid, likedBy: uid});

  /**
   * Removes like from database
   * @param {String} uid Key for user that liked tuit
   * @param {String} tid Key for tuit that was liked
   * @returns Promise to be notified when like is removed from database
   */
  userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
      LikeModel.deleteOne({tuit: tid, likedBy: uid});


  countHowManyLikedTuit = async (tid: string): Promise<any> =>
      LikeModel.count({tuit: tid});

  findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
      LikeModel.findOne({tuit: tid, likedBy: uid});
}