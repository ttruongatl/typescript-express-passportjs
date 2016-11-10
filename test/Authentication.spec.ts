/**
 * 
 * 
 * 
 */
import * as server from '../src/App';
import * as request from 'supertest';
import * as chai from 'chai';
var expect = chai.expect;
var should = chai.should();

describe('Authentication', function () {
    var timestamp = new Date().getTime();
    var defaultPassword = '1234@1234'
    
    beforeEach(function () {
    });
    afterEach(function () {
    });

    describe('User SignUp with Username & Password', function () {
        var apiUrl = '/api/authentication/signupwithusernameandpassword';
        

        it('should return user object trying to register sucessfully', function (done) {
            var user = {
                username: 'unittest' + timestamp + '@gmail.com',
                password: defaultPassword
            };
            request(server)
                .post(apiUrl)
                .send(user)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(200);
                    done();
                });
        });

        it('should return "UserExistsError" trying to register with existing username', function (done) {
            var user = {
                username: 'unittest' + timestamp + '@gmail.com',
                password: defaultPassword,
                fullname: 'salonhelps'
            };
            request(server)
                .post(apiUrl)
                .send(user)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(409);
                    res.body.should.have.property('err');
                    res.body.err.name.should.be.equal('UserExistsError');
                    done();
                });
        });
    });

    describe('User Signin with Username & Password', function () {
        var apiUrl = '/api/Authentication/signinwithusernameandpassword';        

        it('should return "SignInFailed" error trying to Signin wrong password or username', function (done) {
            var user = {
                username: 'test@salonhelps.com',
                password: defaultPassword
            };
            request(server)
                .post(apiUrl)
                .send(user)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log('body:', res.body);
                    res.status.should.be.equal(403);
                    res.body.should.have.property('err');
                    res.body.err.should.be.equal('SignInFailed');
                    done();
                });
        });

        it('should return user & auth object trying to Signin sucessfully', function (done) {
            var user = {
                username: 'unittest' + timestamp + '@gmail.com',
                password: defaultPassword
            };
            request(server)
                .post(apiUrl)
                .send(user)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(200);
                    res.body.should.have.property('user');
                    res.body.user.username.should.be.equal(user.username);
                    res.body.should.have.property('auth');
                    res.body.auth.should.have.property('token');
                    done();
                });
        });
    });   
});