import IFollowDao from "../interfaces/Follows/IFollowDao";
import FollowModel from "../mongoose/Follows/FollowModel";
import Follow from "../models/Follow";

export default class FollowDao implements IFollowDao {
  private static followDao: FollowDao | null = null;
  public static getInstance = (): FollowDao => {
    if(FollowDao.followDao === null) {
      FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
  }
  private constructor() {}
  followUser = async (uid1: string, uid2: string): Promise<Follow> =>
      FollowModel.create({userFollowing: uid1, userFollowed: uid2});

  unfollowUser = async (uid1: string, uid2: string): Promise<any> =>
      FollowModel.deleteOne({userFollowing: uid1, userFollowed: uid2})

  viewFollowers = async (uid: string): Promise<Follow[]> =>
      FollowModel
      .find({userFollowed: uid})
      .populate("userFollowing")
      .exec();

  viewFollowing = async (uid: string): Promise<any> =>
      FollowModel
      .find({userFollowing: uid})
      .populate("userFollowed")
      .exec();
}