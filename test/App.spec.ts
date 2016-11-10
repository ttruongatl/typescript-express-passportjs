import * as server from '../src/App';
import * as request from 'supertest';
import * as chai from 'chai';
var expect = chai.expect;
var should = chai.should();

describe('loading express', function () {
    beforeEach(function () {
    });
    afterEach(function () {
    });
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});
