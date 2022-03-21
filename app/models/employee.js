const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
})
const Employee = mongoose.model('employees', EmployeeSchema);
class EmployeeDetails {
    createEmployee(empData, callback) {
        const employee = new Employee({
            firstName: empData.firstName,
            lastName: empData.lastName,
            emailId: empData.emailId,
            gender: empData.gender,
            salary: empData.salary,
            department: empData.department
        })
        employee.save({}, (error, data) => {
            return error ? callback(error, null) : callback(null, data);
        })
    }
    getAllEmployees(callback) {
        Employee.find({}, (error, data) => {
            return error ? callback(error, null) : callback(null, data);
        });
    }
    getOneEmployee(empId,callback){
        Employee.findById(empId,(error,data)=>{
        return error ? callback(error, null) : callback(null, data);
        
         });
    }
    updateEmployee(empId,employee,callback){
        try{
            Employee.findByIdAndUpdate(empId,{
                firstName:employee.firstName,
				lastName:employee.lastName,
				emailId:employee.emailId,
				gender:employee.gender,
				salary:employee.salary,
				department:employee.department
              },{new:true},(error,data)=>{
                  return error? callback(error,null):callback(null,data);
              })
            }catch(error){
                return callback(error,null);

            }
        }
    }


module.exports = new EmployeeDetails();