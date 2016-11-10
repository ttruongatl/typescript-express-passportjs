import * as server from '../src/App';
import * as request from 'supertest';
import * as chai from 'chai';
var expect = chai.expect;
var should = chai.should();

describe('Calculator', () => {
    beforeEach(function () {
    });
    afterEach(function () {
    });
    it('sum', function (done) {
        request(server)
            .post('/api/calculator/sum')
            .send({
                'x': 2,
                'y': 3
            })
            .end(function (err, res) {
                res.status.should.be.equal(200);
                res.body.should.have.property('sum');
                res.body.sum.should.be.equal(5);
                done();
            });
    });
});
