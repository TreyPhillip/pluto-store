//tests for product categories
const chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app'),
should = chai.should();
chai.use(chaiHttp);


//pull all the records
describe('Testing Get all the product categories', function () {
    it('expect the all categories to be returned', function (done) {
        chai.request(server).get('/reviews').end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

//invalid record
describe('Test review is pulling a valid review with id 1', function () {
    it('status 200 with an object', function (done) {
        chai.request(server).get('/reviews/1').end((err, res) => {

            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

