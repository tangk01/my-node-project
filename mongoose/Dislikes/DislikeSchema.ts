import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/Dislike";

/**
 * @typedef Dislike Represents a disliking a post
 * @property {ObjectId} tuit ID of tuit that was disliked
 * @property {ObjectId} dislikedBy ID of user that disliked tuit
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
  tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
  dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;