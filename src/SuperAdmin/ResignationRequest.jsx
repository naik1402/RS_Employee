import React, { useState } from 'react';
import TopBar from '../Admin/TopBar';
import ResignationService from '../ApiServices/ApprovalResignationService';
import { toast } from 'react-toastify';

const Resignation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [combinedData, setCombinedData] = useState([]); // No dummy data

  const handleStatusChange = async (resId, newStatus) => {
    try {
      const result = await ResignationService.updateResignationStatus(resId, newStatus);
      toast.success(result);
      setCombinedData((prev) =>
        prev.map((item) =>
          item.id === resId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      toast.error(error);
      console.error("Status change error:", error);
    }
  };

  const filteredResignations = combinedData.filter((res) =>
    res.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TopBar tittle="List of Resignation Details" />

      <div className="min-h-full bg-[#AB95F947] rounded-3xl p-5 mt-7">
        <div className="w-full flex justify-end mb-10">
          <input
            type="text"
            placeholder="Search by name, reason or status"
            className="border rounded-3xl bg-white text-black p-3 w-full sm:w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          {/* Header */}
          <div className="bg-[#AB95F991] text-white rounded-full px-10 py-5 font-semibold min-w-[1000px] flex justify-between items-center">
            <span className="w-1/12 text-center">SL.NO</span>
            <span className="w-2/12 text-center">Name</span>
            <span className="w-2/12 text-center">Email</span>
            <span className="w-2/12 text-center">Mobile</span>
            <span className="w-2/12 text-center">Designation</span>
            <span className="w-2/12 text-center">Reason</span>
            <span className="w-2/12 text-center">Apply Date</span>
            <span className="w-1/12 text-center">Status</span>
            <span className="w-2/12 text-center">Action</span>
          </div>

          {/* Rows */}
          <div className="bg-[#FFFFFFD1] border border-[#9DCAF908] mt-5 p-4 flex flex-col gap-3 rounded-3xl min-w-[1000px]">
            {filteredResignations.length > 0 ? (
              filteredResignations.map((res, index) => (
                <div key={res.id} className="flex justify-between items-center p-3 bg-[#AB95F987] rounded-xl">
                  <span className="w-1/12 text-center">{index + 1}</span>
                  <span className="w-2/12 text-center">{res.fullName}</span>
                  <span className="w-2/12 text-center">{res.emailId}</span>
                  <span className="w-2/12 text-center">{res.mobileNo}</span>
                  <span className="w-2/12 text-center">{res.designation}</span>
                  <span className="w-2/12 text-center">{res.reason}</span>
                  <span className="w-2/12 text-center">{res.dateOfApplying}</span>
                  <span className="w-1/12 text-center">
                    {res.status === 'Pending' ? (
                      <div className="flex gap-2 justify-center text-xl">
                        <button onClick={() => handleStatusChange(res.id, 'Approved')} className="text-green-600">✔️</button>
                        <button onClick={() => handleStatusChange(res.id, 'Rejected')} className="text-red-600">❌</button>
                      </div>
                    ) : (
                      <span className={`font-semibold ${res.status === 'Approved' ? 'text-green-700' : 'text-red-700'}`}>
                        {res.status}
                      </span>
                    )}
                  </span>
                  <span className="w-2/12 text-center text-gray-400">N/A</span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600">No resignation requests found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resignation;
