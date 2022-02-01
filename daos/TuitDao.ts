import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
  async findAllTuit(): Promise<Tuit[]> {
    return await TuitModel.find();
  }

  async findTuitsByUser(uid: string): Promise<Tuit[]> {
    return await TuitModel.find({postedBy: uid});
  }

  async findTuitById(tid: string): Promise<Tuit> {
    return await TuitModel.findById(tid);
  }

  async createTuit(tuit: Tuit): Promise<Tuit> {
    return await TuitModel.create(tuit);
  }

  async updateUser(tid: string, tuit: Tuit): Promise<any> {
    return await TuitModel.updateOne({_id: tid}, {$set: tuit});
  }

  async deleteUserTuit(tid: string):  Promise<any> {
    return await TuitModel.deleteOne({_id: tid});
  }
}