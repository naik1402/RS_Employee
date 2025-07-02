// LeavePopup.jsx
import React, { useState } from 'react';

const LeavePopup = ({ onClose }) => {
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form); // Replace with API or state update
    onClose(); // Close popup
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-xl bg-black/50 flex items-center justify-center">
      <div className="bg-[#2F5B37] rounded-3xl p-8 w-[90%] md:w-[70%] lg:w-[60%] text-white">
        <div className="flex justify-between gap-6 mb-6">
          <div className="flex flex-col w-full">
            <label className="text-white font-semibold mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="bg-[#DCE0DC] text-black p-4 rounded-xl"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-white font-semibold mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="bg-[#DCE0DC] text-black p-4 rounded-xl"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="text-white font-semibold mb-2 block">Reason For Leave</label>
          <textarea
            name="reason"
            onChange={handleChange}
            className="bg-[#DCE0DC] text-black p-4 w-full h-32 rounded-xl resize-none"
            placeholder="Please mention your reason here"
          ></textarea>
        </div>
        <div className="flex justify-center gap-10">
          <button
            onClick={onClose}
            className="bg-[#4F9A59] px-10 py-2 rounded-full font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#4F9A59] px-10 py-2 rounded-full font-bold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeavePopup;
