import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/Tuit";

/**
 * @typedef Tuit Represents a tuit post
 * @property {String} tuit The message in the tuit
 * @property {Date} postedOn The date the tuit was posted
 * @property {ObjectId} postedBy ID of user who posted tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
  tuit: {type: String, required: true},
  postedOn: {type: Date, default: Date.now},
  postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
  stats: {
    replies: {type: Number, default: 0},
    retuits: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0}
  }
}, {collection: "tuits"});
export default TuitSchema;