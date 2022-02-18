import mongoose, {Schema} from "mongoose";
import Follow from "../../models/Follow";

/**
 * @typedef Follow Represents a user following another user
 * @property {ObjectId} userFollowed ID of user who is being followed
 * @property {ObjectId} userFollowing ID of user who is following
 */
const FollowSchema = new mongoose.Schema<Follow>({
  userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
  userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;