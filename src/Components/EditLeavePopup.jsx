// components/EditLeavePopup.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import LeaveRequestService from '../ApiServices/LeaveRequestService';

const EditLeavePopup = ({ leaveData, onClose, onSubmitSuccess }) => {
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    status: '',
  });

  useEffect(() => {
    if (leaveData) {
      setForm({
        startDate: leaveData.startDate,
        endDate: leaveData.endDate,
        reason: leaveData.reason,
        status: leaveData.status,
      });
    }
  }, [leaveData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await LeaveRequestService.updateLeaveRequest(leaveData.id, form); // Use ID directly from leaveData
      toast.success("Leave updated successfully!");
      onSubmitSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to update leave.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-xl bg-black/50 flex items-center justify-center">
      <div className="bg-[#2F5B37] rounded-3xl p-8 w-[90%] md:w-[70%] lg:w-[60%] text-white">
        <h2 className="text-xl font-bold mb-6">Edit Leave</h2>
        <div className="flex justify-between gap-6 mb-6">
          <div className="flex flex-col w-full">
            <label className="font-semibold mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="bg-[#DCE0DC] text-black p-4 rounded-xl"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="bg-[#DCE0DC] text-black p-4 rounded-xl"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="font-semibold mb-2 block">Reason</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            className="bg-[#DCE0DC] text-black p-4 w-full h-32 rounded-xl resize-none"
            placeholder="Reason for leave"
          ></textarea>
        </div>
        <div className="flex justify-center gap-10">
          <button onClick={onClose} className="bg-gray-500 px-10 py-2 rounded-full font-bold">
            Cancel
          </button>
          <button onClick={handleUpdate} className="bg-[#4F9A59] px-10 py-2 rounded-full font-bold">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLeavePopup;
