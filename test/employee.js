const chai = require('chai');
const chaihttp = require('chai-http');
const server=require('../server.js');
const employeeInput=require('./employee.json')
const userDetails = require('./user.json');

//Assertion style
chai.should();
chai.use(chaihttp);

    let token="";
    beforeEach((done)=>{
        const userData=userDetails.user.login;
        chai
        .request(server)
        .post('/login')
        .send(userData)
        .end((error,res)=>{
            if(error){
                return done(error);
            } 
            token=res.body.token;
            res.should.have.status(200);
            done();
        })
    })

    describe("Add Employee",()=>{
        it("givenDataIsValid_ShouldCreateNewEmployee",(done)=>{
            const userData=employeeInput.employeeData;
            chai.request(server)
            .post("/employee")
            .send(userData)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(201);
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('message').eql("Employee created successfully");
                res.body.should.have.property('data');
                done();
              });
        })
        it("givenNameIsInValid_shouldFailToCreateNewEmployee", (done) => {
            const userData = employeeInput.employeeWrongName;
            chai.request(server)
              .post("/employee")
              .send(userData)
              .set('token', token )
              .end((error, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql('Enter valid details');
                res.body.should.have.property('data');
                done();
              });
          });
          it("givenMailIdIsInValid_shouldFailToCreateNewEmployee", (done) => {
            const userData = employeeInput.employeeWrongMailId;
            chai.request(server)
              .post("/employee")
              .send(userData)
              .set('token', token )
              .end((error, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql('Enter valid details');
                res.body.should.have.property('data');
                done();
              });
          }); it("givenEmployeeDetails_whenNoName_shouldFailToCreateNewEmployee", (done) => {
            const userData = employeeInput.employeeNoName;
            chai.request(server)
              .post("/employee")
              .send(userData)
              .set('token', token )
              .end((error, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql('Enter valid details');
                res.body.should.have.property('data');
                done();
              });
          });
        
          it("givenEmployeeDetails_whenNoEmailId_shouldFailToCreateNewEmployee", (done) => {
            const userData = employeeInput.employeeNoMailId;
            chai.request(server)
              .post("/employee")
              .send(userData)
              .set('token', token )
              .end((error, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql('Enter valid details');
                res.body.should.have.property('data');
                done();
              });
          });
        
          it("givenEmployeeDetails_whenNoGender_shouldFailToCreateNewEmployee", (done) => {
            const userData = employeeInput.employeeNoGender;
            chai.request(server)
              .post("/employee")
              .send(userData)
              .set('token', token )
              .end((error, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql('Enter valid details');
                res.body.should.have.property('data');
                done();
              });
          });
        })
        describe("Retrieve Data", () => {
            it("givenValidRequest_shouldRetrieveAllEmployeeData", (done) => {
              chai.request(server)
                .get("/employee")
                .set('token', token )
                .end((error, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('success').eql(true);
                  res.body.should.have.property('message').eql('Retrieved employee details');
                  res.body.should.have.property('data');
                  done();
                });
            });
          
            it("givenInvalidRequest_notPassingToken_shouldFailTo_retrieveAllEmployeeData", (done) => {
              chai.request(server)
                .get("/employee")
                .end((error, res) => {
                  res.should.have.status(401);
                  done();
                });
            });
          })
          describe("Retrieve One Data", () => {
            it("givenValidId_shouldRetrieveOneEmployeeData", (done) => {
              const id = employeeInput.getEmployeeById.id;
              chai.request(server)
                .get("/" + id)
                .set('token', token )
                .end((error, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('success').eql(true);
                  res.body.should.have.property('message').eql('Retrieved employee details');
                  res.body.should.have.property('data');
                  done();
                })
            });
        
            it("givenInValidId_shouldFailTo_retrieveOneEmployeeData", (done) => {
              const id = employeeInput.getWrongEmployeeId.id;
              chai.request(server)
                .get("/" + id)
                .set('token', token )
                .end((error, res) => {
                  res.should.have.status(400);
                  done();
                });
            });
        })
        describe("UpdateData", () => {
            it("givenValidId_shouldUpdateEmployeeData", (done) => {
              const id = employeeInput.updateEmployeeDetails.id;
              chai.request(server)
                .put("/" + id)
                .set('token', token )
                .end((error, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('success').eql(true);
                  res.body.should.have.property('message').eql('Updated data Successfully');
                  res.body.should.have.property('data');
                  done();
                });
            });
          
            it("givenInvalidId_shouldFailTo_UdateEmployeeData", (done) => {
              const id = employeeInput.updateWrongId.id;
              chai.request(server)
                .put("/" + id)
                .set('token', token )
                .end((error, res) => {
                  res.should.have.status(500);
                  done();
                });
            });
          })
          
describe("DeleteData", () => {
    it("givenValidId_shouldDeleteEmployeeData", (done) => {
      const id = employeeInput.deleteEmployeeDetails.id;
      chai.request(server)
        .delete("/" + id)
        .set('token', token )
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Deleted employee successfully');
          res.body.should.have.property('data');
          done();
        });
    });
  })