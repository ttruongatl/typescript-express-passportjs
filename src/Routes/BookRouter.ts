/*
 * GET users listing.
 */


import { Router, Request, Response } from 'express';
import { BookManagement } from './../Modules/Book/BookManagement';
import { BookData } from './../Modules/Book/BookData';
import { AuthenticationRouter } from './AuthenticationRouter';
export class BookRouter {
    private router: Router = Router();

    getRouter(): Router {
        var bookManagement = new BookManagement();
        var authenticationRouter = new AuthenticationRouter();
        this.router.post('/add', authenticationRouter.verifyToken ,async (request: Request, response: Response) => {
            var bookData: BookData = {
                author: request.body.author,
                title: request.body.title,
                year: request.body.year
            };
            //TODO: have to use Anonymouse class
            let result = await bookManagement.addNewBook(bookData);
            response.statusCode = result.code;
            if (result.err) {
                response.json(result.err);
            } else {
                response.json(result.data);
            }
        });

        this.router.post('/getbyauthor', async function (request: Request, response: Response) {
            //TODO: have to use Anonymouse class
            let result: any = await bookManagement.getBookByAuthor(request.body.author);
            response.statusCode = result.code;
            if (result.err) {
                response.json(result.err);
            } else {
                response.json(result.data);
            }
        });

        return this.router;

    }
}

