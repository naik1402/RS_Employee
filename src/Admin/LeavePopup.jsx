import React, { useState, useEffect } from 'react';
import LeaveRequestService from '../ApiServices/LeaveRequestService';
import { toast } from 'react-toastify';

const LeavePopup = ({ onClose, onSubmitSuccess }) => {
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    status: 'pending',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    startDate: false,
    endDate: false,
    reason: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  useEffect(() => {
    const validateForm = () => {
      const errs = {};
      const { startDate, endDate, reason } = form;

      if (!startDate) errs.startDate = 'Start date is required';
      if (!endDate) errs.endDate = 'End date is required';
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        errs.endDate = 'End date must be after start date';
      }
      if (!reason.trim()) errs.reason = 'Reason is required';

      setErrors(errs);
    };

    validateForm();
  }, [form]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleSubmit = async () => {
    // mark all fields as touched to show all errors if submitting
    setTouched({ startDate: true, endDate: true, reason: true });

    if (!isFormValid) {
      toast.error("Please correct the form errors.");
      return;
    }

    const finalPayload = {
      ...form,
      mobileNo: '8093421865',
    };

    try {
      await LeaveRequestService.applyhrleave(finalPayload);
      toast.success("Leave request submitted!");
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error("Leave request error:", error);
      if (error.response?.status === 409) {
        toast.error(error.response.data);
      } else {
        toast.error("Failed to submit leave request.");
      }
    }
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
              value={form.startDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-[#DCE0DC] text-black p-4 rounded-xl"
            />
            {touched.startDate && errors.startDate && (
              <span className="text-red-400 text-sm mt-1">{errors.startDate}</span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-white font-semibold mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-[#DCE0DC] text-black p-4 rounded-xl"
            />
            {touched.endDate && errors.endDate && (
              <span className="text-red-400 text-sm mt-1">{errors.endDate}</span>
            )}
          </div>
        </div>
        <div className="mb-6">
          <label className="text-white font-semibold mb-2 block">Reason For Leave</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            onBlur={handleBlur}
            className="bg-[#DCE0DC] text-black p-4 w-full h-32 rounded-xl resize-none"
            placeholder="Please mention your reason here"
          ></textarea>
          {touched.reason && errors.reason && (
            <span className="text-red-400 text-sm mt-1">{errors.reason}</span>
          )}
        </div>
        <div className="flex justify-center gap-10">
          <button onClick={onClose} className="bg-[#4F9A59] px-10 py-2 rounded-full font-bold">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`px-10 py-2 rounded-full font-bold ${
              !isFormValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4F9A59]'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeavePopup;
