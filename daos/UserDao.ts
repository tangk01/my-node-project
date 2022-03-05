/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import User from "../models/User";
import UserModel from "../mongoose/Users/UserModel";
import UserDaoI from "../interfaces/Users/IUserDao";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {

  /**
   * Uses UserModel to find all users
   * @returns Promise to be notified when users are retrieved from database
   */
  async findAllUsers(): Promise<User[]> {
    return await UserModel.find();
  }

  /**
   * Uses UserModel to find a specific user
   * @param {String} uid Key for user wanted
   * @returns Promise to be notified when user is retrieved from database
   */
  async findUserById(uid: string): Promise<User> {
    return await UserModel.findById(uid);
  }

  /**
   * Inserts a User instance into database
   * @param {User} user User instance to be inserted into database
   * @returns Promise to be notified when user is inserted into database
   */
  async createUser(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  /**
   * Updates a user in database
   * @param {String} uid Key for user to be updated
   * @param {User} user User instance to be inserted into database
   * @returns Promise to be notified when user is updated in database
   */
  async updateUser(uid: string, user: User): Promise<any> {
    return await UserModel.updateOne({_id: uid}, {$set: user});
  }

  /**
   * Removes a user from database
   * @param {String} uid Key for user to be removed
   * @returns Promise to be notified when user is removed from database
   */
  async deleteUser(uid: string):  Promise<any> {
    return await UserModel.deleteOne({_id: uid});
  }





}