import React, { useEffect, useState } from 'react';
import TopBar from '../Admin/TopBar';
import LeaveRequestService from '../ApiServices/LeaveRequestService';
import EmployeeService from '../ApiServices/EmployeeService';
import LeaveApprovalService from '../ApiServices/LeaveApprovalService';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa';

function EmployeeLeaveDetails() {
  const [combinedData, setCombinedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaveRes, empRes] = await Promise.all([
          LeaveRequestService.fetchEmployeeleave(),
          EmployeeService.fetchEmployeeDetails(),
        ]);

        const combined = leaveRes.data.map((leave) => {
          const match = empRes.data.find(
            (emp) =>
              emp.emailId?.toLowerCase().trim() === leave.emailId?.toLowerCase().trim() ||
              emp.mobileNo?.trim() === leave.mobileNo?.trim()
          );

          return {
            ...leave,
            fullName: match?.fullName || 'N/A',
            emailId: match?.emailId || leave.emailId || 'N/A',
            mobileNo: match?.mobileNo || leave.mobileNo || 'N/A',
            designation: match?.designation || 'N/A',
            status: leave.status || 'Pending',
          };
        });

        setCombinedData(combined);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        toast.error("Error fetching leave or employee data.");
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (leaveId, index, status) => {
    try {
      const response = await LeaveApprovalService.updateStatus(leaveId, status);
      toast.success(response);

      const updated = [...combinedData];
      updated[index].status = status;
      setCombinedData(updated);
    } catch (err) {
      console.error("Error updating leave status:", err);
      toast.error(`Failed to update status: ${err}`);
    }
  };

  const handleDelete = (index) => {
    const updated = [...combinedData];
    updated.splice(index, 1);
    setCombinedData(updated);
  };

  const filteredLeaves = combinedData.filter((leave) =>
    leave.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TopBar tittle="Employee Leave requests" />

      <div className="min-h-full bg-[#9AF99B52] rounded-3xl p-5 mt-7">
        <div className="w-full flex justify-end mb-10">
          <input
            type="text"
            placeholder="Search by name, reason or status"
            className="border rounded-3xl bg-white text-black p-3 w-96"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <div className="bg-[#278B4A99] text-white rounded-full px-6 py-4 font-semibold min-w-[1000px] flex justify-between items-center">
            <span className="w-20 text-center">SL.NO</span>
            <span className="w-40 text-center">Name</span>
            <span className="w-52 text-center">Email</span>
            <span className="w-40 text-center">Mobile</span>
            <span className="w-40 text-center">Designation</span>
            <span className="w-44 text-center">Reason</span>
            <span className="w-40 text-center">Start Date</span>
            <span className="w-40 text-center">End Date</span>
            <span className="w-44 text-center">Status</span>
            <span className="w-24 text-center">Action</span>
          </div>

          <div className="bg-[#FFFFFFD1] border border-[#9DCAF908] mt-5 p-4 flex flex-col gap-2 rounded-3xl min-w-[1000px]">
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave, index) => (
                <div
                  key={leave.id || index}
                  className="flex justify-between items-center p-3 bg-[#9AF99B91] rounded-xl"
                >
                  <span className="w-20 text-center">{index + 1}</span>
                  <span className="w-40 text-center">{leave.fullName}</span>
                  <span className="w-52 text-center">{leave.emailId}</span>
                  <span className="w-40 text-center">{leave.mobileNo}</span>
                  <span className="w-40 text-center">{leave.designation}</span>
                  <span className="w-44 text-center">{leave.reason}</span>
                  <span className="w-40 text-center">{leave.startDate}</span>
                  <span className="w-40 text-center">{leave.endDate}</span>

                  <span className="w-44 text-center flex justify-center gap-2">
                    {leave.status === 'Accepted' || leave.status === 'Rejected' ? (
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          leave.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {leave.status}
                      </span>
                    ) : (
                      <>
                        <FaCheckCircle
                          className="text-green-600 cursor-pointer"
                          onClick={() => handleStatusChange(leave.id, index, 'Approved')}
                        />
                        <FaTimesCircle
                          className="text-red-600 cursor-pointer"
                          onClick={() => handleStatusChange(leave.id, index, 'Rejected')}
                        />
                      </>
                    )}
                  </span>

                  <span className="w-24 text-center flex justify-center gap-3">
                    <FaEdit className="text-blue-600 cursor-pointer" />
                    <FaTrash
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(index)}
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
    </div>
  );
}

export default EmployeeLeaveDetails;
