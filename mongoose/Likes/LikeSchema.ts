import mongoose, {Schema} from "mongoose";
import Like from "../../models/Like";

/**
 * @typedef Like Represents a liking a post
 * @property {ObjectId} tuit ID of tuit that was liked
 * @property {ObjectId} likedBy ID of user that liked tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
  tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
  likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;