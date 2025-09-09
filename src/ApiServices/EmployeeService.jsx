import React, { Component } from 'react'
import axios from 'axios'

const Api_base_url ="http://localhost:5000";
 class EmployeeService {
    static AddEmployee(data){
        return axios.post(`${Api_base_url}/api/employees`,data,{
            headers:{"Content-Type":"application/json"}
        })
    }
    static fetchEmployeeDetails() {
        return axios.get(`${Api_base_url}/api/employees`, {
            headers: { "Content-Type": "application/json" }
        })
    } 
    static deleteEmployeeById(empId) {
    return axios.delete(`${Api_base_url}/api/employees/${empId}`, {
      headers: { "Content-Type": "application/json" }
    })
  }
  static updateEmployeeById(empId, data) {
  return axios.put(`${Api_base_url}/api/employees/${empId}`, data, {
    headers: { "Content-Type": "application/json" }
  });
}
}export default EmployeeService;