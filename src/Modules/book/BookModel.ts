/**
 * 
 * 
 * 
 * 
 */

import { IBookData } from './BookData';
import { mongoose } from './../../Services/Database';

import * as passportLocalMongoose from 'passport-local-mongoose';
import Schema = mongoose.Schema;


const BookSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  year: Number
});


var BookModel;
try {
  // Throws an error if 'Name' hasn't been registered
  BookModel = mongoose.model('Book')
} catch (e) {
  BookModel = mongoose.model<IBookData>('Book', BookSchema);
}

export = BookModel;