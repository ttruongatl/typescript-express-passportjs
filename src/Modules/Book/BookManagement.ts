/**
 * 
 * 
 * Class BookManagement
 * 
 */

import { BookData, IBookData } from './BookData';
import BookModel = require('./BookModel');

export class BookManagement {
    public async addNewBook(book: BookData) {

        var response: any = {};
        var dataCreation = BookModel.create(book)
        await dataCreation.then(function (docs) {
            response.data = docs;
            response.code = 200;
            return;
        }, function (error) {
            response.err = error
            response.code = 500;
            return;
        })
        return response;
    }

    public async getBookByAuthor(author: string) {

        var response: any = {};

        var bookSearch = BookModel.find({ 'author': author }).exec();
        await bookSearch.then(function (docs: IBookData) {
            if (docs) {
                response.data = docs;
                response.code = 200;
            } else {
                response.err = 'BookNotFound';
                response.code = 400;
            }
        }, function (err) {
            response.err = err;
            response.code = 500;
        })

        return response;

    }
}