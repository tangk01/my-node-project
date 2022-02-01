import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

export default class UserDao implements UserDaoI {
  async findAllUsers(): Promise<User[]> {
    return await UserModel.find();
  }
  async findUserById(uid: string): Promise<User> {
    return await UserModel.findById(uid);
  }
  async createUser(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  async updateUser(uid: string, user: User): Promise<any> {
    return await UserModel.updateOne({_id: uid}, {$set: user});
  }

  async deleteUser(uid: string):  Promise<any> {
    return await UserModel.deleteOne({_id: uid});
  }
}