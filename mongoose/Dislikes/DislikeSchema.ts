import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/Dislike";

/**
 * @typedef Like Represents a liking a post
 * @property {ObjectId} tuit ID of tuit that was liked
 * @property {ObjectId} likedBy ID of user that liked tuit
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
  tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
  dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;