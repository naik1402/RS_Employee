import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import TopBar from '../Admin/TopBar';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import ApprovalNewEmployeeService from '../ApiServices/ApprovalNewEmployeeService';
import { toast } from 'react-toastify';

function NewEmployeeRequest() {
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState([]);



  const handleAccept = async (id) => {
    try {
      const data = await ApprovalNewEmployeeService.updateStatus(id, 'Approved');
      toast.success(data);
      setRequests((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      toast.error(`Failed to approve: ${error}`);
    }
  };

  const handleReject = async (id) => {
    try {
      const data = await ApprovalNewEmployeeService.updateStatus(id, 'Rejected');
      toast.success(data);
      setRequests((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      toast.error(`Failed to reject: ${error}`);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit clicked for employee ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this request?')) {
      setRequests((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const filteredRequests = requests.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      emp.fullName?.toLowerCase().includes(term) ||
      emp.empId?.toLowerCase().includes(term) ||
      emp.emailId?.toLowerCase().includes(term) ||
      emp.designation?.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <TopBar tittle="New Employee Requests" btn="" />
      <div className="h-full bg-[#94C8FF73] rounded-3xl p-5 mt-7">
        {/* Search */}
        <div className="relative w-full flex justify-end mb-10">
          <span className="absolute text-gray-500 mt-4 me-6">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search by name, ID, email or designation"
            className="border rounded-3xl bg-white text-black p-3 w-[30rem]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="bg-[#00D5FF73] text-white rounded-full px-10 py-5 font-semibold min-w-[900px] flex justify-between items-center">
            <span className="w-24 text-center">SL.NO</span>
            <span className="w-40 text-center">Employee ID</span>
            <span className="w-48 text-center">Employee Name</span>
            <span className="w-60 text-center">Employee Email</span>
            <span className="w-48 text-center">Employee Mobile</span>
            <span className="w-40 text-center">Designation</span>
            <span className="w-32 text-center">Status</span>
            <span className="w-32 text-center">Action</span>
          </div>

          <div className="bg-white h-[51vh] border border-[#9DCAF908] mt-5 p-4 flex flex-col gap-2 rounded-3xl overflow-y-scroll scrollbar-hide min-w-[900px]">
            {filteredRequests.length === 0 ? (
              <p className="text-center text-gray-600 text-lg">No new employee requests found.</p>
            ) : (
              filteredRequests.map((emp, index) => (
                <div
                  key={emp.id}
                  className="flex justify-between items-center p-3 bg-[#9DCAF999] rounded-xl"
                >
                  <span className="w-24 text-center">{index + 1}</span>
                  <span className="w-40 text-center">{emp.empId || '-'}</span>
                  <span className="w-48 text-center">{emp.fullName}</span>
                  <span className="w-60 text-center">{emp.emailId}</span>
                  <span className="w-48 text-center">{emp.mobileNo}</span>
                  <span className="w-40 text-center">{emp.designation}</span>

                  <span className="w-32 text-center flex justify-center gap-2 text-2xl">
                    <button onClick={() => handleAccept(emp.id)} className="text-green-600">
                      <AiOutlineCheckCircle />
                    </button>
                    <button onClick={() => handleReject(emp.id)} className="text-red-600">
                      <AiOutlineCloseCircle />
                    </button>
                  </span>

                  <span className="w-32 text-center flex justify-center gap-2 text-2xl">
                    <button onClick={() => handleEdit(emp.id)} className="text-blue-600">
                      <AiFillEdit />
                    </button>
                    <button onClick={() => handleDelete(emp.id)} className="text-red-600">
                      <AiFillDelete />
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewEmployeeRequest;
