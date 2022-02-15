import {Request, Response} from "express";

export default interface IMessageController {
  sendMessage (req: Request, res: Response): void;
  viewSentMessage (req: Request, res: Response): void;
  viewReceivedMessage (req: Request, res: Response): void;
  deleteMessage (req: Request, res: Response): void;
}