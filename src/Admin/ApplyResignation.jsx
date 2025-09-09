import React, { useState } from 'react';

const ApplyResignation = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    reason: '',
    mobileNo: '',
    dateOfApplying: '',
  });

  const [errors, setErrors] = useState({
    reason: '',
    mobileNo: '',
    dateOfApplying: '',
  });

  const validate = () => {
    const newErrors = {
      reason: form.reason.trim() === '' ? 'Reason is required.' : '',
      mobileNo:
        !/^\d{10}$/.test(form.mobileNo) ? 'Enter a valid 10-digit mobile number.' : '',
      dateOfApplying: form.dateOfApplying === '' ? 'Apply date is required.' : '',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === '');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // live validation
    if (e.target.name === 'mobileNo') {
      setErrors({
        ...errors,
        mobileNo:
          /^\d{10}$/.test(e.target.value) ? '' : 'Enter a valid 10-digit mobile number.',
      });
    }
    if (e.target.name === 'reason') {
      setErrors({
        ...errors,
        reason: e.target.value.trim() !== '' ? '' : 'Reason is required.',
      });
    }
    if (e.target.name === 'dateOfApplying') {
      setErrors({
        ...errors,
        dateOfApplying: e.target.value !== '' ? '' : 'Apply date is required.',
      });
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(form);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xl bg-black/50 z-50">
      <div className="bg-[#382a52] rounded-3xl p-6 w-[80%] md:w-[50%] text-white">
        <h2 className="text-lg font-semibold mb-4">Reason For Leaving Company</h2>

        {/* Reason */}
        <textarea
          name="reason"
          rows={4}
          value={form.reason}
          onChange={handleChange}
          className={`w-full p-4 rounded-2xl text-black placeholder:text-gray-500 resize-none bg-white ${
            errors.reason ? 'border-2 border-red-500' : ''
          }`}
          placeholder="Please mention your reason here"
        ></textarea>
        {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}

        {/* Mobile No */}
        <div className="mt-4">
          <input
            type="text"
            name="mobileNo"
            maxLength="10"
            value={form.mobileNo}
            onChange={handleChange}
            placeholder="Enter your 10-digit mobile number"
            className={`w-full p-4 rounded-2xl text-black bg-white ${
              errors.mobileNo ? 'border-2 border-red-500' : ''
            }`}
          />
          {errors.mobileNo && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>
          )}
        </div>

        {/* Apply Date */}
        <div className="mt-4">
          <input
            type="date"
            name="dateOfApplying"
            value={form.dateOfApplying}
            onChange={handleChange}
            className={`w-full p-4 rounded-2xl text-black bg-white ${
              errors.dateOfApplying ? 'border-2 border-red-500' : ''
            }`}
          />
          {errors.dateOfApplying && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfApplying}</p>
          )}
        </div>

        {/* Buttons */}
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
