import Follow from "../../models/Follow";
import {Request, Response} from "express";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface IFollowDao {
  followUser (uid1: string, uid2: string): Promise<Follow>;
  unfollowUser (uid1: string, uid2: string): Promise<any>;
  viewFollowers (uid: string): Promise<Follow[]>;
  viewFollowing (uid: string): Promise<Follow[]>;
};