/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/Tuits/TuitModel";
import ITuitDao from "../interfaces/Tuits/ITuitDao";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Users
 */
export default class TuitDao implements ITuitDao {

  /**
   * Uses TuitModel to find all tuits
   * @returns Promise to be notified when tuits are retrieved from database
   */
  async findAllTuits(): Promise<Tuit[]> {
    return await TuitModel.find();
  }

  /**
   * Uses TuitModel to find all tuits by a certain user
   * @param {String} uid Key for user to find tuits from
   * @returns Promise to be notified when tuits are retrieved from database
   */
  async findTuitsByUser(uid: string): Promise<Tuit[]> {
    return await TuitModel.find({postedBy: uid});
  }

  /**
   * Uses TuitModel to find a specific tuit
   * @param {String} tid Key for tuit that is wanted
   * @returns Promise to be notified when tuit is retrieved from database
   */
  async findTuitById(tid: string): Promise<any> {
    return await TuitModel.findById(tid);
  }

  /**
   * Inserts a tuit instance into database
   * @param {String} uid Key for user that made tuit
   * @param {Tuit} tuit Tuit instance to be inserted into database
   * @returns Promise to be notified when tuit is inserted in database
   */
  async createTuit(uid: string, tuit: Tuit): Promise<Tuit> {
    return await TuitModel.create({...tuit, postedBy: uid});
  }

  /**
   * Updates a tuit in database
   * @param {String} tid Key for tuit to be updated
   * @param {Tuit} tuit Tuit instance to be inserted into database
   * @returns Promise to be notified when tuit is updated in database
   */
  async updateTuit(tid: string, tuit: Tuit): Promise<any> {
    return await TuitModel.updateOne({_id: tid}, {$set: tuit});
  }

  /**
   * Removes a tuit from database
   * @param {String} tid Key for tuit to be removed
   * @returns Promise to be notified when tuit is removed from database
   */
  async deleteTuit(tid: string):  Promise<any> {
    return await TuitModel.deleteOne({_id: tid});
  }



  deleteTuitsByTuit = async (tuit: string): Promise<any> =>
      TuitModel.deleteMany({tuit});

  updateLikes = async (tid: string, newStats: any): Promise<any> =>
      TuitModel.updateOne({_id: tid}, {$set: {stats: newStats}});

  updateDislikes = async (tid: string, newStats: any): Promise<any> =>
      TuitModel.updateOne({_id: tid}, {$set: {stats: newStats}});
}