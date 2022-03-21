const { id } = require("../middleware/employeeValidation");
const employeeModel = require("../models/employee");

class EmployeeService {
	createEmployee(empData, callback) {
		employeeModel.createEmployee(empData, (error, data) => {
			return error ? callback(error, null) : callback(null, data);
		});
	}
    getAllEmployees(callback){
        employeeModel.getAllEmployees((error,data)=>{
            return error?callback(error,null):callback(null,data);
        });
    }
    getEmployeeById(employeeId,callback){
        employeeModel.getOneEmployee(employeeId, (error, empData) => {
			return error ? callback(error, null) : callback(null, empData);
		});
    }
    updateEmployee(empId,employee,callback){
        try{
            employeeModel.updateEmployee(empId,employee,(error,data)=>{
                if(error){
                    return callback(error,null);
                }
                else{
                    return callback(null,data);
                }
            });
        }catch(error){
            return callback(error,null)
        }
    }
}
module.exports=new EmployeeService();