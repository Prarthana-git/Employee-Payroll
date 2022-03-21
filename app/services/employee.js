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
}
module.exports=new EmployeeService();