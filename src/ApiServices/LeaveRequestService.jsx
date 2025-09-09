// LeaveRequestService.jsx
import axios from 'axios';    

const api_leave_url = "http://localhost:5000/api";

class LeaveRequestService {
  static fetchEmployeeleave() {
    return axios.get(`${api_leave_url}/leaves/employee`, {
      headers: { "Content-Type": "application/json" }
    });
  }

  static fetchHrleave(){
    return axios.get(`${api_leave_url}/leaves/hr`,{
      headers:{"Content-Type":"application/json"}
    })
  }

  static applyhrleave(data) {
    return axios.post(`${api_leave_url}/leaves/hr`, data, {
      headers: { "Content-Type": "application/json" }
    });
  }
   static deleteLeaveRequest(empId) {
    return axios.delete(`${api_leave_url}/leaves/hr/${empId}`, {
      headers: { "Content-Type": "application/json" }
    })
  }
      static updateLeaveRequest(empId, data) {
  return axios.put(`${api_leave_url}/leaves/hr/${empId}`, data, {
    headers: { "Content-Type": "application/json" }
  });
}

 
}

export default LeaveRequestService;
