import app = require('../src/App');
import { expect } from 'chai';
import  request = require('supertest');

describe('loading express', function () {
    var server;
    beforeEach(function () {
    });
    afterEach(function () {
    });
    it('responds to /', function testSlash(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
        request(app)
            .get('/foo/bar')
            .expect(404, done);
    });
});
