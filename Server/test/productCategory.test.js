//tests for product categories
const chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app'),
should = chai.should();
chai.use(chaiHttp);


//pull all the records
describe('Testing Get all the product categories', function () {
    it('expect the all categories to be returned', function (done) {
        chai.request(server).get('/product/category').end((err, res) => {
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
        chai.request(server).get('/product/category/1').end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            chai.expect(['"categoryId":"1", "categoryname":"Clothing" ']).to.be.an('array');
            done();
        })
    });
});

//Post
describe('Testing Post product category', function () {
    it('expect the success message returned', function (done) {
        chai.request(server).post('/product/category/add')
        .send({categoryname:'cutlery'})
        .end(function(err, res){

            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            chai.assert.equal(res.text,'"Product category successfully been added"');
            done();
        })
    });
});

//update a product category object
describe('Testing update product category', function () {
    it('success message to be returned ', function (done) {
        chai.request(server).put('/product/category/update')
        .send({categoryId:'1', categoryname:"shoes"})
        .end(function(err, res){
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            chai.assert.equal(res.text,'"Product category update"');
          //  console.log(res);
            done();
        });
    });
});

//delete a product category
describe('Testing deletion message', function () {
    it('expect the delete message to be returned', function (done) {
        chai.request(server).delete('/product/category/delete')
        .send({categoryId:'1'})
        .end(function(err, res){
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            chai.assert.equal(res.text,'"Product category has successfully been deleted"');
          //  console.log(res);
            done();
        });
    });
});