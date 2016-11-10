/*
 * GET users listing.
 */


import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { Authentication } from './../Core/Authentication/Authentication';

export class AuthenticationRouter {
    private router: Router = Router();

    getRouter(): Router {
        var authentication = new Authentication();

        this.router.post('/signupwithusernameandpassword', async(request: Request, response: Response) => {    
            //TODO: have to use Anonymouse class
            let result = await authentication.signUpWithUsernameAndPassword(request.body.username, request.body.password);
            response.statusCode = result.code;
            if(result.err){
                response.json(result.err);
            }else{
                response.json(result.data);
            }
        });

        this.router.post('/signinwithusernameandpassword', async function (request: Request, response: Response) {
            //TODO: have to use Anonymouse class
            let result:any = await authentication.signInWithUsernameAndPassword(request.body.username, request.body.password);
            response.statusCode = result.code;
            if(result.err){
                response.json(result.err);
            }else{
                response.json(result.data);
            }
        });

        return this.router;

    }
}

