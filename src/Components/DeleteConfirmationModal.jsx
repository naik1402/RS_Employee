import React from 'react';

const DeleteConfirmationModal = ({ onCancel, onConfirm, employeeName }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-xl bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#00D5FF73] text-black rounded-3xl p-8 w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Confirm Delete</h2>
        <p className="text-center mb-6">
          Are you sure you want to delete <span className="font-bold">{employeeName}</span>?
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={onCancel}
            className="bg-[#0B0E74] text-white px-6 py-2 rounded-full hover:bg-blue-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
