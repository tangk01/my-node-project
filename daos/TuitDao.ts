/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import ITuitDao from "../interfaces/ITuitDao";

export default class TuitDao implements ITuitDao {
  async findAllTuits(): Promise<Tuit[]> {
    return await TuitModel.find();
  }

  async findTuitsByUser(uid: string): Promise<Tuit[]> {
    return await TuitModel.find({postedBy: uid});
  }

  async findTuitById(tid: string): Promise<any> {
    return await TuitModel.findById(tid);
  }

  async createTuit(tuit: Tuit, uid: string): Promise<Tuit> {
    return await TuitModel.create({tuit, postedBy: uid});
  }

  async updateTuit(tid: string, tuit: Tuit): Promise<any> {
    return await TuitModel.updateOne({_id: tid}, {$set: tuit});
  }

  async deleteTuit(tid: string):  Promise<any> {
    return await TuitModel.deleteOne({_id: tid});
  }
}