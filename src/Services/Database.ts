/**
 * 
 * 
 */
import mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:123456@ds149437.mlab.com:49437/samples');

export { mongoose };