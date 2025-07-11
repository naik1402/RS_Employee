import React, { Component } from 'react'
import axios from 'axios'

const Api_base_url ="http://183.82.106.55:9104";
 class EmployeeService {
    static AddEmployee(data){
        return axios.post(`${Api_base_url}/Employee/post`,data,{
            headers:{"Content-Type":"application/json"}
        })
    }
    static fetchEmployeeDetails() {
        return axios.get(`${Api_base_url}/Employee/get`, {
            headers: { "Content-Type": "application/json" }
        })
    } 
    static deleteEmployeeById(id) {
    return axios.delete(`${Api_base_url}/Employee/delete/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
  }
  static updateEmployeeById(id, data) {
  return axios.put(`${Api_base_url}/Employee/update/${id}`, data, {
    headers: { "Content-Type": "application/json" }
  });
}
}export default EmployeeService;