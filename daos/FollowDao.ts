/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import IFollowDao from "../interfaces/Follows/IFollowDao";
import FollowModel from "../mongoose/Follows/FollowModel";
import Follow from "../models/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements IFollowDao {
  private static followDao: FollowDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns FollowDao
   */
  public static getInstance = (): FollowDao => {
    if(FollowDao.followDao === null) {
      FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
  }
  private constructor() {}

  /**
   * Inserts follow between users into database
   * @param uid1 Key for user who is following
   * @param uid2 Key for user who is followed
   * @returns Promise to be notified when follow is updated in the database
   */
  followUser = async (uid1: string, uid2: string): Promise<Follow> =>
      FollowModel.create({userFollowing: uid1, userFollowed: uid2});

  /**
   * Removes follow between users in database
   * @param {String} uid1 Key for user who is following
   * @param {String} uid2 Key for user who is followed
   * @returns Promise to be notified when follow is updated in the database
   */
  unfollowUser = async (uid1: string, uid2: string): Promise<any> =>
      FollowModel.deleteOne({userFollowing: uid1, userFollowed: uid2})

  /**
   * Uses FollowModel to retrieve all followers of user
   * @param {String} uid Key for user to retrieve followers from
   * @returns Promise To be notified when the follows are retrieved from
   * database
   */
  viewFollowers = async (uid: string): Promise<Follow[]> =>
      FollowModel
      .find({userFollowed: uid})
      .populate("userFollowing")
      .exec();

  /**
   * Uses FollowModel to retrieve all those the user is following
   * @param {String} uid Key for user to retrieve following from
   * @returns Promise To be notified when the follows are retrieved from
   * database
   */
  viewFollowing = async (uid: string): Promise<any> =>
      FollowModel
      .find({userFollowing: uid})
      .populate("userFollowed")
      .exec();
}