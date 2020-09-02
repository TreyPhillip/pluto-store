//tests for product categories
const chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app'),
should = chai.should();
chai.use(chaiHttp);

//pulls all the prdoucts
describe('Testing Get for All Payments', function () {
    it('expect all payments to be returns', function (done) {
        chai.request(server).get('/payment').end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            done();
        })
    });
});

//Check if a credit card number is already saved ---- 
describe('Testing if a credit card is saved already using a credit card that save already', function () {
    it('expect the success message returned', function (done) {
        chai.request(server).post('/payment/validateCreditNumber')
        .send({creditcardnumber:4916667815973814})
        .end(function(err, res){
            should.not.exist(err);
            res.should.have.status(404);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            chai.assert.equal(res.text,"Credit Card is registered already");
            done();
        })
    });
});

//Check if a credit card number is already saved ---- 
describe('Testing if a credit card is saved already using a credit card that not save already', function () {
    it('expect all payments to be returns', function (done) {
        chai.request(server).post('/payment/validateCreditNumber')
        .send({creditcardnumber:5550422241632461})  
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            chai.expect(res).to.be.json;
            res.should.be.a('object');
            chai.assert.equal(res.text,"The credit card is not taken");
            done();
        })
    });
});

//Add A New Payment
describe('Testing to add a new payment', function () {
    it('expect payment to successfully be added', function (done) {
        chai.request(server).post('/payment/add')
        .send({
            accountid: 1,
            creditcardnumber:2221007295727782,
            cardholdername: 'Leo Lemon',
            expirationdate: "2021-05-11",
            cvcode: 123
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

//PAYMENT UPDATE: existing Payment
describe('Testing Update a payment', function () {
    it('expect ', function (done) {
        chai.request(server).put('/payment/update')
        .send({
            paymentid: 4,
            accountid: 1,
            creditcardnumber:2221007295727782,
            cardholdername: 'Jim Lemon',
            expirationdate: "2021-05-11",
            cvcode: 123
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

//DELETE PAYMENT : that does not exist
describe('Testing Delete a Payment', function () {
    it('expect all payments to be returns', function (done) {
        chai.request(server).delete('/payment/delete')
        .send({
            paymentid: 1
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
//DELETE PAYMENT : that does exist
describe('Testing Delete a Payment', function () {
    it('expect all payments to be returns', function (done) {
        chai.request(server).delete('/payment/delete')
        .send({
            paymentid: 4
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


