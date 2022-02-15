import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({
  bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
  bookmarkedUser: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;