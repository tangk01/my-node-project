import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/Bookmark";

/**
 * @typedef Bookmark Represents a user bookmarking a tuit
 * @property {ObjectId} bookmarkedTuit ID of tuit being bookmarked
 * @property {ObjectId} bookmarkedUser ID of user being bookmarked
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
  bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
  bookmarkedUser: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;