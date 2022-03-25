const { id } = require("../middleware/employeeValidation");
const employeeModel = require("../models/employee");
const { client } = require("../../config/redis");
class EmployeeService {
  createEmployee(empData, callback) {
    // console.log('empData',empData);
    employeeModel.createEmployee(empData, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  }
  getAllEmployees(callback) {
    const empData = employeeModel.getAllEmployees((error, data) => {
      if (error) {
        callback (error,null);
      } else {
        client.set("allEmployee",60, JSON.stringify(data));
        return empData;
      }
    });
  }
  getEmployeeById(employeeId, callback) {
    employeeModel.getOneEmployee(employeeId, (error, empData) => {
      return error ? callback(error, null) : callback(null, empData);
    });
  }
  updateEmployee(empId, employee, callback) {
    try {
      employeeModel.updateEmployee(empId, employee, (error, data) => {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    } catch (error) {
      return callback(error, null);
    }
  }
  removeEmployee(empId, callback) {
    try {
      employeeModel.removeEmployee(empId, (error, data) => {
        if (!empId) {
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    } catch (error) {
      return callback(error, null);
    }
  }
}
module.exports = new EmployeeService();
