//tests for product categories
const chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app'),
should = chai.should();
chai.use(chaiHttp);


//Get ALL WISHLIST ITEMS
describe('Testing Get Wishlist items', function () {
    it('expect all wishlist Items', function (done) {
        chai.request(server).get('/wishlist').end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});
//CHECK IF PRODUCT IS ON WISHLIST ---> INVALID (ERROR)
describe('Check if the wishlist item already exists on the wishlist ', function () {
    it('expects the item to already exist on the wishlist', function (done) {
        chai.request(server).post('/check_wishlist')
        .send({accountid: 1, productid: 6})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(301);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

//CHECK IF PRODUCT IS ON WISHLIST  --  VALIDATE 
describe('Check if the wishlist item already exists on the wishlist ', function () {
    it('expects the item to already exist on the wishlist', function (done) {
        chai.request(server).post('/check_wishlist')
        .send({accountid: 1, productid: 1})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

//CHECK IF PRODUCT IS ON WISHLIST -- VALIDATE 
describe('Check if the wishlist item does not exists on the wishlist ', function () {
    it('expects the item to not exist on the wishlist', function (done) {
        chai.request(server).post('/wishlist/add')
        .send({accountid: 1, productid: 1})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

//DELECT A NON-EXSIT PRODUCT
describe('DELETED non existing product on the wishlist ', function () {
    it('expects a 401 error', function (done) {
        chai.request(server).delete('/wishlist/delete')
        .send({wishlistid:40})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(401);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

//CHECK IF PRODUCT IS ON WISHLIST -- VALIDATE 
describe('TEST DELETE A EXISTING PRODUCT', function () {
    it('expects A 200 status and product has been delete', function (done) {
        chai.request(server).delete('/wishlist/delete')
        .send({wishlistid:14})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

