const chai = require('chai');
const chaihttp = require('chai-http');
const { response } = require('../server.js');
const server=require('../server.js');
const userDetails=require('./user.json')
const except=chai.except;

//Assertion style
chai.should();
chai.use(chaihttp);

describe('register',()=>{
    // it('givenValidDataItShould_makePostRequestAndRegisterUser_andReturnsStatusCodeAs201',(done)=>{
    //     const userData=userDetails.user.register;
    //     chai.request(server)
    //     .post('/register')
    //     .send(userData)
    //     .end((err,res)=>{
    //         if (err){
    //             return done(err);
    //         }
    //         res.should.have.status(201);
    //         res.body.should.be.a('object')
    //         res.body.should.have.property('success').eql(true);
    //         res.body.should.have.property('message').eql('User Registered');
    //         res.body.should.have.property('data').should.be.a('object');
    //         done();
    //     })

    // })
    it('givenEmptyFirstName_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        const userData = userDetails.user.registerwithnofirstName;
        chai.request(server)
          .post('/register')
          .send(userData)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Please Enter Valid Fields');
            done();
          });
      });
      it('givenEmptyLastName_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        const userData = userDetails.user.registerwithnofirstName;
        chai.request(server)
          .post('/register')
          .send(userData)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Please Enter Valid Fields');
            done();
          });
      });
      it('givenEmptyEmail_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400',(done)=>{
        const userData = userDetails.user.registerwithnoemailId;
        chai.request(server)
        .post('/register')
        .send(userData)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Please Enter Valid Fields');
            done();
        })
      })
      it('givenEmptypassword_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
         const userData=userDetails.user.registrationWithNoPassword;
         chai.request(server)
         .post('/register')
         .send(userData)
         .end((err,res)=>{
             if(err){
                 return done(err);
             }
             res.should.have.status(400);
             res.body.should.be.a('object');
             res.body.should.have.property('success').eql(false);
             res.body.should.have.property('message').eql('Please Enter Valid Fields');
             done();
         }) 
    })
})