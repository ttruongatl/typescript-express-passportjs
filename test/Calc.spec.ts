import app = require('../src/App');
import request = require('supertest');
//import { expect, should } from 'chai';
import * as chai from 'chai';
var expect = chai.expect;
var should = require('chai').should();

describe('Calculator', () => {
    beforeEach(function () {
    });
    afterEach(function () {
    });
    it('sum', function (done) {
        request(app)
            .post('/api/sum')
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
