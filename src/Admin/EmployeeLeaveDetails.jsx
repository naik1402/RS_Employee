import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import LeaveRequestService from '../ApiServices/LeaveRequestService';
import EmployeeService from '../ApiServices/EmployeeService';
import { toast } from 'react-toastify';

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

        console.log("Leave Requests:", leaveRes.data);
        console.log("Employee Details:", empRes.data);

        const combined = leaveRes.data.map((leave) => {
          // Try matching by email first, then mobile number
          const match = empRes.data.find(
            (emp) =>
              emp.emailId?.toLowerCase().trim() === leave.emailId?.toLowerCase().trim() ||
              emp.mobileNo?.trim() === leave.mobileNo?.trim()
          );

          return {
            ...leave,
            fullName: match?.name || 'N/A',
            emailId: match?.email || leave.email || 'N/A',
            mobileNo: match?.mobile || leave.mobile || 'N/A',
            designation: match?.designation || 'N/A',
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

  const filteredLeaves = combinedData.filter((leave) =>
    leave.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TopBar tittle={"List Of Employee Leave"} />
      <div className="min-h-full bg-[#9AF99B52] rounded-3xl p-5 mt-7">
        <div className="w-full flex justify-end mb-10">
          <input
            type="text"
            placeholder="Search by name, reason or status"
            className="border rounded-3xl bg-white text-black p-3 w-120"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-[#278B4A99] text-white rounded-full px-10 py-5 font-semibold flex justify-between items-center">
          <span className="w-1/12 text-center">SL.NO</span>
          <span className="w-2/12 text-center">Name</span>
          <span className="w-2/12 text-center">Email</span>
          <span className="w-2/12 text-center">Mobile</span>
          <span className="w-2/12 text-center">Designation</span>
          <span className="w-2/12 text-center">Reason</span>
          <span className="w-2/12 text-center">Start Date</span>
          <span className="w-2/12 text-center">End Date</span>
          <span className="w-2/12 text-center">Status</span>
        </div>

        <div className="bg-[#FFFFFFD1] border border-[#9DCAF908] mt-10 p-4 flex flex-col gap-1 rounded-3xl">
          {filteredLeaves.length > 0 ? (
            filteredLeaves.map((leave, index) => (
              <div
                key={leave.id || index}
                className="flex justify-between items-center p-3 bg-[#9AF99B91] rounded-xl"
              >
                <span className="w-1/12 text-center">{index + 1}</span>
                <span className="w-2/12 text-center">{leave.name}</span>
                <span className="w-2/12 text-center">{leave.email}</span>
                <span className="w-2/12 text-center">{leave.mobile}</span>
                <span className="w-2/12 text-center">{leave.designation}</span>
                <span className="w-2/12 text-center">{leave.reason}</span>
                <span className="w-2/12 text-center">{leave.startDate}</span>
                <span className="w-2/12 text-center">{leave.endDate}</span>
                <span className="w-2/12 text-center">{leave.status || 'Pending'}</span>
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

export default EmployeeLeaveDetails;
