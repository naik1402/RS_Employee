import React, { useState } from 'react';
import TopBar from '../Admin/TopBar';
import { AiFillEdit, AiFillDelete} from 'react-icons/ai'; 


function EmployeeSelfLeaveDetails() {
  const [searchTerm, setSearchTerm] = useState('');

  const dummyLeaves = [
    {
      id: 1,
      reason: 'Medical leave',
      startDate: '2025-07-01',
      endDate: '2025-07-03',
      status: 'Approved',
    },
    {
      id: 2,
      reason: 'Family function',
      startDate: '2025-07-10',
      endDate: '2025-07-12',
      status: 'Pending',
    },
    {
      id: 3,
      reason: 'Vacation',
      startDate: '2025-07-20',
      endDate: '2025-07-25',
      status: 'Rejected',
    },
  ];

  const filteredLeaves = dummyLeaves.filter((leave) =>
    leave.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
    // Handle edit logic
  };

  const handleDelete = (id) => {
    console.log("Delete clicked for ID:", id);
    // Handle delete logic
  };

  return (
    <div>
      <TopBar tittle={"My Leave Requests"} btn="Apply"/>
      <div className="min-h-full bg-[#9AF99B52] rounded-3xl p-5 mt-7">
        <div className="w-full flex justify-end mb-10">
          <input
            type="text"
            placeholder="Search by reason or status"
            className="border rounded-3xl bg-white text-black p-3 w-120"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-[#278B4A99] text-white rounded-full px-10 py-5 font-semibold flex justify-between items-center">
          <span className="w-1/12 text-center">SL.NO</span>
          <span className="w-3/12 text-center">Reason</span>
          <span className="w-2/12 text-center">Start Date</span>
          <span className="w-2/12 text-center">End Date</span>
          <span className="w-2/12 text-center">Status</span>
          <span className="w-2/12 text-center">Action</span>
        </div>

        <div className="bg-[#FFFFFFD1] border border-[#9DCAF908] mt-10 p-4 flex flex-col gap-1 rounded-3xl">
          {filteredLeaves.length > 0 ? (
            filteredLeaves.map((leave, index) => (
              <div
                key={leave.id || index}
                className="flex justify-between items-center p-3 bg-[#9AF99B91] rounded-xl"
              >
                <span className="w-1/12 text-center">{index + 1}</span>
                <span className="w-3/12 text-center">{leave.reason}</span>
                <span className="w-2/12 text-center">{leave.startDate}</span>
                <span className="w-2/12 text-center">{leave.endDate}</span>
                <span className="w-2/12 text-center">{leave.status}</span>
                <span className="w-2/12 text-center flex justify-center gap-5">
                  <AiFillEdit
                    className="text-yellow-500 text-xl cursor-pointer"
                    onClick={() => handleEdit(leave.id)}
                    title="Edit"
                  />
                  <AiFillDelete
                    className="text-red-600 text-xl cursor-pointer"
                    onClick={() => handleDelete(leave.id)}
                    title="Delete"
                  />
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 p-4">No leave requests found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeSelfLeaveDetails;
