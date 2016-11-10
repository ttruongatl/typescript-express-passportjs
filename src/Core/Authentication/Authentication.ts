/**
 * 
 * 
 * 
 * 
 */
import UserModel = require('./UserModel');
import { IUserData, UserData } from './UserData'
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

export class Authentication {

    /**
     * signUpWithUsernameAndPassword
     * create new user with username (phone or email) & password
     * @param : 
     *     Error: validation Error
     *     Successful: 
     *             {
     *                  user:{
     *                     username: string
     *                     status: boolean
     *                     id: string
     *                  }
     *             }
     * @returns 
     */
    public async signUpWithUsernameAndPassword(username: string, password: string): Promise<any> {

        //TODO: Validation
        var response: any = {};
        var user: UserData = {
            username: username,
            status: true,
            is_verified: false,
            is_temporary: false
        };
        // Kill callback function
        let promise = new Promise<any>(function (resolve, reject) {
            UserModel.register(new UserModel(user), password, function (err) {
                if (err) {
                    response.err = { 'err': err };
                    response.code = 409;
                    response.data = undefined;
                } else {
                    response.err = undefined;
                    response.code = 200;
                }
                resolve(response);
            });
        });
        return promise;

    }

    /**
     * signInWithUsernameAndPassword
     * Sign In with username & password
     * @param : 
     *     Error: Validation Error
     *     Successful: 
     *             {
     *                  user:{
     *                     username: string
     *                     status: boolean
     *                     id: string
     *                  },
     *                  auth:{
     *                     token: string
     *                  }
     *             }
     * @returns 
     */
    public async signInWithUsernameAndPassword(username: string, password: string) {

        var response: any = {};

        //TODO: Validation
        let promise = new Promise(function (resolve, reject) {
            UserModel.authenticate()(username, password, function (err: any, user: IUserData, error: any) {
                if (err) {
                    response.err = { 'err': err };
                    response.code = 409;
                    response.data = undefined;
                }
                if (!user) {
                    response.err = { 'err': 'SignInFailed' };
                    response.code = 403;
                    response.data = undefined;
                } else {
                    var created_at = new Date().getTime();
                    var cert = fs.readFileSync('./Config/Dev/Private.key');  // get private key

                    var UserToken = {
                        _id: user._id,
                        username: user.username,
                        status: user.status
                    };

                    var token = jwt.sign(UserToken, cert, { algorithm: 'RS256' });
                    response.err = undefined;
                    response.code = 200;
                    response.data = {
                        user: UserToken,
                        auth: {
                            token: token
                        }
                    };
                }
                resolve(response);

            });
        });
        return promise;
    }

    /**
     * Check access TOKEN in Request
     * Push user(id, iat, ...) to req.user
     */
    public verifyToken(token: string) {
        var response: any = {};
        let promise = new Promise(function (resolve, reject) {

            if (!token) {
                response.err = 'InvalidToken';
                response.code = 403;
                response.data = undefined;
            } else {
                var cert = fs.readFileSync('./Config/Dev/Public.pem');  // get private key
                jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, payload) {
                    if (err) {
                        response.err = 'InvalidToken';
                        response.code = 403;
                        response.data = undefined;
                    } else {
                        response.err = undefined;
                        response.code = 200;
                        response.data = payload;
                    }
                });
            }
            resolve(response);
        });
        return promise;
    }
}