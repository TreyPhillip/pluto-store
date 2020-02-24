//tests for product categories
const chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app'),
should = chai.should();
chai.use(chaiHttp);

//pull profiles
describe('Testing Get all the product categories', function () {
    it('expect the all categories to be returned', function (done) {
        chai.request(server).get('/profile').end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});
// get a product category --- make sure the correct product is being pulled.
describe('Testing Get a single product category', function () {
    it('expect the clothing category and id to be pulled ', function (done) {
        chai.request(server).get('/profile/1').end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            chai.expect(['"profileId":"1", "firstname":"Kevin", "lastname":"lastname","phonenumber":"555-555-5555" ']).to.be.an('array');
            done();
        })
    });
});

//Post
describe('Testing Post product category', function () {
    it('expect the success message returned', function (done) {
        chai.request(server).post('/profile/add')
        .send({firstname:"Alex", lastname:"oak", phonenumber:"555-555-5555"})
        .end(function(err, res){

            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            chai.assert.equal(res.text,'"Profile has been successfully created"');
            done();
        })
    });
});

//update a product category object
describe('Testing update product category', function () {
    it('success message to be returned ', function (done) {
        chai.request(server).put('/profile/update')
        .send({profileid:"1",firstname:"Jim", lastname:"oak", phonenumber:"555-555-5555"})
        .end(function(err, res){
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            chai.assert.equal(res.text,'"Profile has successfully been updated"');
          //  console.log(res);
            done();
        });
    });
});
//delete a product category
describe('Testing deletion message', function () {
    it('expect the delete message to be returned', function (done) {
        chai.request(server).delete('/profile/delete')
        .send({profileid:'1'})
        .end(function(err, res){
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            chai.assert.equal(res.text,'"Profile successfully delete"');
          //  console.log(res);
            done();
        });
    });
});