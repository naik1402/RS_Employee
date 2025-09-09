import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import LeavePopup from './LeavePopup';
import LeaveRequestService from '../ApiServices/LeaveRequestService';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import EditLeavePopup from './EditLeavePopup';

import { toast } from 'react-toastify';

function HRLeaveDetails() {
  const [showPopup, setShowPopup] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [leaveToDeleteId, setLeaveToDeleteId] = useState(null);
  const [editLeaveData, setEditLeaveData] = useState(null);


  const fetchLeaves = async () => {
    try {
      const response = await LeaveRequestService.fetchEmployeeleave();
      setLeaveData(response.data);
    } catch (error) {
      console.error("Failed to fetch leave data", error);
      toast.error("Failed to load leave requests");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const confirmDelete = async () => {
    try {
      await LeaveRequestService.deleteLeaveRequest(leaveToDeleteId);
      toast.success(`Leave request deleted successfully (ID: ${leaveToDeleteId})`);
      fetchLeaves();
    } catch (error) {
      if (error.response?.status === 403) {
        toast.warning("Leave cannot be deleted (status must be 'request' or 'pending').");
      } else if (error.response?.status === 404) {
        toast.error(`Leave request not found (ID: ${leaveToDeleteId})`);
      } else {
        toast.error("Unexpected error while deleting.");
      }
      console.error("Delete error:", error);
    } finally {
      setLeaveToDeleteId(null);
    }
  };

  return (
    <div>
      <TopBar
        tittle="List of HR Leave Details"
        btn="Apply"
        onAddClick={() => setShowPopup(true)}
      />

      {showPopup && (
        <LeavePopup
          onClose={() => setShowPopup(false)}
          onSubmitSuccess={fetchLeaves}
        />
      )}

      {leaveToDeleteId !== null && (
        <ConfirmDeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setLeaveToDeleteId(null)}
        />
      )}
      {editLeaveData && (
  <EditLeavePopup
    leaveData={editLeaveData}
    onClose={() => setEditLeaveData(null)}
    onSubmitSuccess={fetchLeaves}
  />
)}


      <div className="min-h-full bg-[#9AF99B52] rounded-3xl p-5 mt-7">
        <div className="w-full flex justify-end mb-10">
          <input
            type="text"
            placeholder="Search by name, ID, email or designation"
            className="border rounded-3xl bg-white text-black p-3 w-120"
          />
        </div>

        {/* Table Header */}
        <div className="bg-[#278B4A99] text-white rounded-full px-10 py-5 font-semibold flex justify-between items-center">
          <span className="w-1/12 text-center">SL.NO</span>
          <span className="w-2/12 text-center">Reason</span>
          <span className="w-2/12 text-center">Start Date</span>
          <span className="w-2/12 text-center">End Date</span>
          <span className="w-2/12 text-center">Status</span>
          <span className="w-1/12 text-center">Action</span>
        </div>

        {/* Table Rows */}
        <div className="bg-[#FFFFFFD1] border border-[#9DCAF908] mt-10 p-4 flex flex-col gap-1 rounded-3xl">
          {leaveData.length === 0 ? (
            <div className="text-center text-gray-500 py-6">No leave requests found.</div>
          ) : (
            leaveData.map((leave, index) => (
              <div
                key={leave.id || index}
                className="flex justify-between items-center p-3 bg-[#9AF99B91] rounded-xl"
              >
                <span className="w-1/12 text-center">{index + 1}</span>
                <span className="w-2/12 text-center">{leave.reason}</span>
                <span className="w-2/12 text-center">{leave.startDate}</span>
                <span className="w-2/12 text-center">{leave.endDate}</span>
                <span className="w-2/12 text-center capitalize">{leave.status}</span>
                <span className="w-1/12 text-center flex justify-center">
                  <button
                        className="text-[#A18008D1] text-2xl px-2"
                        onClick={() => setEditLeaveData(leave)}>
                        <FaUserEdit />
                  </button>

                  <button
                    className="text-red-500 text-2xl px-2"
                    onClick={() => setLeaveToDeleteId(leave.id)}
                    disabled={!leave.id}
                    title={!leave.id ? "Invalid leave ID" : "Delete this leave"}
                  >
                    <MdDeleteForever />
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HRLeaveDetails;
