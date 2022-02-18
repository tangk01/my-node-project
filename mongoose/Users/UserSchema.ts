import mongoose from "mongoose";

/**
 * @typedef User Represents a user on Tuitter
 * @property {String} username Username to log in
 * @property {String} password Password to log in
 * @property {String} firstName First name of user
 * @property {String} lastName Last name of user
 * @property {String} email Email of user
 * @property {String} profilePhoto Profile photo for user
 * @property {String} headerImage Header image for user
 * @property {String} accountType Type of account user has
 * @property {String} martialStatus Martial status of user
 * @property {String} biography Biography of user
 * @property {Date} dateOfBirth Birth date of user
 * @property {Date} joined Date user joined Tuitter
 * @property {Location} location Location of user
 */
const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstName: String,
  lastName: String,
  email: String,
  profilePhoto: String,
  headerImage: String,
  accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
  maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
  biography: String,
  dateOfBirth: Date,
  joined: {type: Date, default: Date.now},
  location: {
    latitude: Number,
    longitude: Number
  },
}, {collection: 'users'});

export default UserSchema;