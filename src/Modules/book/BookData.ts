/**
 * 
 * 
 * 
 */
import { mongoose } from './../../Services/Database';

export interface BookData {
    author: string;
    title: string;
    year: number;
}

export interface IBookData extends BookData, mongoose.Document, mongoose.PassportLocalDocument { };   
