import {Request, Response} from "express";

export default interface IFollowController {
  followUser (req: Request, res: Response): void;
  unfollowUser (req: Request, res: Response): void;
  viewFollowers (req: Request, res: Response): void;
  viewFollowing (req: Request, res: Response): void;
};