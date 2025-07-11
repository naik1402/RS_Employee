// ResignationService.jsx
import axios from 'axios';

const api_res_url = "http://183.82.106.55:9104";

class ResignationService {
  static fetchEmployeeres() {
    return axios.get(`${api_res_url}/Resig/findall`, {
      headers: { "Content-Type": "application/json" }
    });
  }

  static applyResignation(data) {
    return axios.post(`${api_res_url}/Resig/Add`, data, {
      headers: { "Content-Type": "application/json" }
    });
  }
}

export default ResignationService;
