//tests for product categories
const chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app'),
should = chai.should();
chai.use(chaiHttp);


//GET ALL SHIPPING ADDRESS
describe('Testing ALL SHIPPING ADDRESS', function () {
    it('EXPECT ALL SHIPPING ITEMs RETURNED AND 200 STATUS', function (done) {
        chai.request(server).get('/shippingaddress').end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

//CREATE--------
describe('TESTING CREATE SHIPPING ADDRESS ', function () {
    it('EXPECT ALL SHIPPING ITEMs RETURNED AND 200 STATUS', function (done) {
        chai.request(server).post('/shippingaddress/add')
        .send({
            accountid:1,
            firstname:'KEVIN',
            lastname: "LEMON",
            streetaddress: "444 OAK ST",
            city:"KITCHENER",
            country:"CANADA"
        })
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

//DELETE
describe('TESTING DELETE VALID ', function () {
    it('EXPECT RETURN OF 200 STATUS', function (done) {
        chai.request(server).delete('/shippingaddress/delete')
        .send({
           shippingaddressid: 1
        })
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});


//DELETE
describe('TESTING DELETE INVALID ', function () {
    it('EXPECT RETURN OF 401 STATUS', function (done) {
        chai.request(server).delete('/shippingaddress/delete')
        .send({
           shippingaddressid: 8
        })
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(401);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});







