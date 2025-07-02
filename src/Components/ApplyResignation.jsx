// Components/ApplyResignation.jsx
import React, { useState } from 'react';

const ApplyResignation = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (reason.trim() === '') return alert("Please enter your reason.");
    onSubmit(reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xl bg-black/50 z-50">
      <div className="bg-[#382a52] rounded-3xl p-6 w-[80%] md:w-[50%] text-white">
        <h2 className="text-lg font-semibold mb-4">Reason For Leaving Company</h2>
        <textarea
          rows={6}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-4 rounded-2xl text-black placeholder:text-gray-500 resize-none bg-white"
          placeholder="Please mention your reason here"
        ></textarea>

        <div className="flex justify-around mt-6">
          <button
            onClick={onClose}
            className="bg-[#AB95F9] text-white font-bold py-2 px-10 rounded-full hover:bg-[#927ed1]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#AB95F9] text-white font-bold py-2 px-10 rounded-full hover:bg-[#927ed1]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyResignation;
