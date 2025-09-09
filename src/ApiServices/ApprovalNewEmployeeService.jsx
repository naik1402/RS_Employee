// src/ApiServices/ApprovalNewEmployeeService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:9797/Employee';

const ApprovalNewEmployeeService = {
  updateStatus: async (id, decision) => {
    try {
      const response = await axios.put(`${BASE_URL}/decide-status/${id}?decision=${decision}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default ApprovalNewEmployeeService;
