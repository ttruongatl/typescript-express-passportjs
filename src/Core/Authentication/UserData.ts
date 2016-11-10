/**
 * 
 * 
 * 
 */
import { mongoose } from './../../Services/Database';

export interface UserData {
    is_temporary: boolean;
    is_verified: boolean;
    status: boolean;
    username: string;
}

export interface IUserData extends UserData, mongoose.Document, mongoose.PassportLocalDocument { };   
