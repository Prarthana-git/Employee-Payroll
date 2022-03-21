const employeeModel = require("../models/employee");

class EmployeeService {
	createEmployee(empData, callback) {
		employeeModel.createEmployee(empData, (error, data) => {
			return error ? callback(error, null) : callback(null, data);
		});
	}
}
module.exports=new EmployeeService();