const chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app'),
should = chai.should();
chai.use(chaiHttp);

//checkToken no token/ invalid token
describe('Testing the token validation', function () {
    it('a 403 error to be return', function (done) {
        chai.request(server).post('/checkToken')
        .send({tokenString:'not a token '})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(403);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

//test invalid Authentication  --- emailaddress doesn't exist 
describe('Testing authentication for user that does not exist', function () {
    it('a 403 error to be return', function (done) {
        chai.request(server).post('/authentication')

        .send({emailaddress:'y@yahoo.com', userpassword:'password'})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(401);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

//testing for user that does exist
describe('Testing authentication for a user that exists', function () {
    it('a 403 error to be return', function (done) {
        chai.request(server).post('/authentication')
        .send({emailaddress:'k@gmail.com', userpassword:'password'})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});
//invalid registration
describe('Testing registration with invalid parameters', function () {
    it('a 403 error to be return', function (done) {
        chai.request(server).post('/account/register')
        .send({username:"XIFEIOFNIO",userpassword:"password",emailaddress:"nn@gmail.com",isverified:'',profileid:'30000'})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(401);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});
//registration login
describe('Testing registration with valid parameters', function () {
    it('a 403 error to be return', function (done) {
        chai.request(server).post('/account/register')
        .send({username:"XIFEIOFNIO",userpassword:"password",emailaddress:"QQQQQ@Yahoo.com",isverified:'true',profileid:'30'})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});