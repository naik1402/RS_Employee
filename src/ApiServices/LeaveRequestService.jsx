// LeaveRequestService.jsx
import axios from 'axios';    

const api_leave_url = "http://183.82.106.55:9104";

class LeaveRequestService {
  static fetchEmployeeleave() {
    return axios.get(`${api_leave_url}/LeaveRequest/fetch`, {
      headers: { "Content-Type": "application/json" }
    });
  }

  static applyhrleave(data) {
    return axios.post(`${api_leave_url}/LeaveRequest/add`, data, {
      headers: { "Content-Type": "application/json" }
    });
  }
   static deleteLeaveRequest(id) {
    return axios.delete(`${api_leave_url}/LeaveRequest/Erase/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
  }
      static updateLeaveRequest(id, data) {
  return axios.put(`${api_leave_url}/LeaveRequest/LeaveUpdate/${id}`, data, {
    headers: { "Content-Type": "application/json" }
  });
}

 
}

export default LeaveRequestService;
