// src/ApiServices/ResignationService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:9797/Resignation';

const ApprovalResignationService = {
  updateResignationStatus: async (id, decision) => {
    try {
      const response = await axios.put(`${BASE_URL}/decide-status/${id}?decision=${decision}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Error updating resignation status.";
    }
  },
};

export default ApprovalResignationService;
