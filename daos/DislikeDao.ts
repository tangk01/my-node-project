import IDislikeDao from "../interfaces/Dislikes/IDislikeDao";
import DislikeModel from "../mongoose/Dislikes/DislikeModel";
import Dislike from "../models/Dislike";

export default class DislikeDao implements IDislikeDao {
  private static dislikeDao: DislikeDao | null = null;


  public static getInstance = (): DislikeDao => {
    if(DislikeDao.dislikeDao === null) {
      DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
  }
  private constructor() {}

  findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
      DislikeModel
      .find({tuit: tid})
      .populate("dislikedBy")
      .exec();

  findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
      DislikeModel
      .find({dislikedBy: uid})
      .populate("tuit")
      .exec();

  userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
      DislikeModel.create({tuit: tid, dislikedBy: uid});

  userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
      DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});


  countHowManyDislikedTuit = async (tid: string): Promise<any> =>
      DislikeModel.count({tuit: tid});

  findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
      DislikeModel.findOne({tuit: tid, dislikedBy: uid});
}