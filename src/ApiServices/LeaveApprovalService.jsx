import axios from 'axios';

const BASE_URL = 'http://localhost:9797/LeaveRequest';

const LeaveApprovalService = {
  updateStatus: async (id, decision) => {
    try {
      const response = await axios.put(`${BASE_URL}/decide-status/${id}?decision=${decision}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Error updating leave request status";
    }
  }
};

export default LeaveApprovalService;
