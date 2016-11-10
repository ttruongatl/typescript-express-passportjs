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


const UserSchema = new Schema({
  username: { type: String, required: true },
  password: String,
  status: { type: Boolean, required: true },
  is_verified: { type: Boolean, required: true },
  is_temporary: { type: Boolean, required: true }
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