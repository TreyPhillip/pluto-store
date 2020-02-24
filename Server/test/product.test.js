//tests for product categories
const chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app'),
should = chai.should();
chai.use(chaiHttp);

//pulls all the prdoucts
describe('Testing Get all the product categories', function () {
    it('expect the all categories to be returned', function (done) {
        chai.request(server).get('/products').end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});
// pulls a single product
describe('Testing Get a single product category', function () {
    it('expect the clothing category and id to be pulled ', function (done) {
        chai.request(server).get('/products/10').end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            chai.expect(['"productid":"10", "productname":"Pants", "categoryid":"1","sellerid":"1", "price":"10, "description":"pants" ']).to.be.an('array');
            done();
        })
    });
});

//create a product
describe('Testing Post product category', function () {
    it('expect the success message returned', function (done) {
        chai.request(server).post('/products/add')
        .send({productname:"something", categoryid:"1", sellerid:"3", price:"12", description:"something"})
        .end(function(err, res){

            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            chai.assert.equal(res.text,'"Product added successfully"');
            done();
        })
    });
});

//update a product 
describe('Testing update product category', function () {
    it('success message to be returned ', function (done) {
        chai.request(server).put('/products/update')
        .send({productid:10,productname:"something", categoryid:"1", sellerid:"3", price:"12", description:"something"})
        .end(function(err, res){
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            chai.assert.equal(res.text,'"Product modified with ID: 10"');
          //  console.log(res);
            done();
        });
    });
});

//delete a product 
describe('Testing deletion message', function () {
    it('expect the delete message to be returned', function (done) {
        chai.request(server).delete('/products/delete')
        .send({productid:'10'})
        .end(function(err, res){
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            chai.assert.equal(res.text,'"Product was deleted with ID: 10"');
            done();
        });
    });
});