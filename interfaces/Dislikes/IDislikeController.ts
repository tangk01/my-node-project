import {Request, Response} from "express";

export default interface IDislikeController {
  findAllUsersThatDislikedTuit (req: Request, res: Response): void;
  findAllTuitsDislikedByUser (req: Request, res: Response): void;
  userDislikesTuit (req: Request, res: Response): void;
  userUnDislikesTuit (req: Request, res: Response): void;
};