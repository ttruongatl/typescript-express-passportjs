/**
 * 
 * 
 * 
 * 
 */

import { IUserData } from './UserData';
import { mongoose } from './../../Services/Database';

import * as passportLocalMongoose from 'passport-local-mongoose';
import Schema = mongoose.Schema;

const UserProfileSchema = new mongoose.Schema({
  salon_id: { type: String, required: true },
  status: { type: Boolean, required: true },
  role: { type: Number, required: true },
  fullname: { type: String, require: true },
  nickname: { type: String, require: true },
  social_security_number: String,
  salary_rate: Number,
  cash_rate: Number,
  birthday: String,
  address: String,
  email: String

});

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: String,
  status: { type: Boolean, required: true },
  is_verified: { type: Boolean, required: true },
  is_temporary: { type: Boolean, required: true },
  profile: [UserProfileSchema]
});

UserSchema.plugin(passportLocalMongoose);

var UserModel;
try {
  // Throws an error if 'Name' hasn't been registered
  UserModel = mongoose.model('User')
} catch (e) {
  UserModel = mongoose.model<IUserData>('User', UserSchema);
}

export = UserModel;