import React, { useState } from 'react';
import TopBar from '../Admin/TopBar';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const EmployeeSelfResignation = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data (Replace this with API data later)
  const dummyResignations = [
    {
      id: 1,
      reason: 'Personal reasons',
      dateOfApplying: '2025-07-20',
      status: 'Pending',
    },
    {
      id: 2,
      reason: 'Health issues',
      dateOfApplying: '2025-07-18',
      status: 'Approved',
    },
  ];

  const filteredResignations = dummyResignations.filter((res) =>
    res.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TopBar
        tittle="My Resignation Requests"
        btn="Apply"
        onAddClick={() => setShowModal(true)}
      />

      {/* Add Resignation Modal - Implement later */}
      {/* {showModal && (
        <ApplyResignation
          onClose={() => setShowModal(false)}
          onSubmit={handleAddResignation}
        />
      )} */}

      <div className="min-h-full bg-[#AB95F947] rounded-3xl p-5 mt-7">
        <div className="w-full flex justify-end mb-10">
          <input
            type="text"
            placeholder="Search by reason or status"
            className="border rounded-3xl bg-white text-black p-3 w-full md:w-1/2 lg:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1000px] bg-[#AB95F991] text-white rounded-full px-10 py-5 font-semibold flex justify-between items-center">
            <span className="w-1/12 text-center">SL.NO</span>
            <span className="w-4/12 text-center">Reason for Leaving</span>
            <span className="w-3/12 text-center">Apply Date</span>
            <span className="w-2/12 text-center">Status</span>
            <span className="w-2/12 text-center">Action</span>
          </div>

          <div className="bg-[#FFFFFFD1] border border-[#9DCAF908] mt-10 p-4 flex flex-col gap-3 rounded-3xl min-w-[1000px]">
            {filteredResignations.length > 0 ? (
              filteredResignations.map((res, index) => (
                <div
                  key={res.id}
                  className="flex justify-between items-center p-3 bg-[#AB95F987] rounded-xl"
                >
                  <span className="w-1/12 text-center">{index + 1}</span>
                  <span className="w-4/12 text-center">{res.reason}</span>
                  <span className="w-3/12 text-center">{res.dateOfApplying}</span>
                  <span className="w-2/12 text-center">{res.status}</span>
                  <span className="w-2/12 text-center flex justify-center gap-4">
                    <button className="text-blue-700 hover:text-blue-900">
                      <FaEdit size={20} />
                    </button>
                    <button className="text-red-700 hover:text-red-900">
                      <MdDelete size={22} />
                    </button>
                  </span>
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

export default EmployeeSelfResignation;
