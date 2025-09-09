import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import ApplyResignation from './ApplyResignation';
import ResignationService from '../ApiServices/ResignationService';
import EmployeeService from '../ApiServices/EmployeeService';
import { toast } from 'react-toastify';

const Resignation = () => {
  const [showModal, setShowModal] = useState(false);
  const [combinedData, setCombinedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchResignationsAndEmployees = async () => {
    try {
      const [resRes, empRes] = await Promise.all([
        ResignationService.fetchEmployeeres(),
        EmployeeService.fetchEmployeeDetails()
      ]);

      const combined = resRes.data.map((res) => {
        const match = empRes.data.find(
          (emp) =>
            emp.mobileNo === res.mobileNo ||
            emp.emailId === res.emailId
        );
        return {
          ...res,
          fullName: match?.fullName || 'N/A',
          emailId: match?.emailId || 'N/A',
          mobileNo: match?.mobileNo || 'N/A',
          designation: match?.designation || 'N/A',
        };
      });

      setCombinedData(combined);
    } catch (error) {
      toast.error("Failed to load resignation or employee data.");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchResignationsAndEmployees();
  }, []);

  const handleAddResignation = async (data) => {
    try {
      await ResignationService.applyResignation(data);
      toast.success("Resignation applied successfully!");
      fetchResignationsAndEmployees();
    } catch (error) {
      toast.error("Failed to apply resignation.");
      console.error("Apply error:", error);
    }
  };

  const filteredResignations = combinedData.filter((res) =>
    res.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TopBar
        tittle="List of Resignation Details"
        btn="Apply"
        onAddClick={() => setShowModal(true)}
      />

      {showModal && (
        <ApplyResignation
          onClose={() => setShowModal(false)}
          onSubmit={handleAddResignation}
        />
      )}

      <div className="min-h-full bg-[#AB95F947] rounded-3xl p-5 mt-7">
        <div className="w-full flex justify-end mb-10">
          <input
            type="text"
            placeholder="Search by name, reason or status"
            className="border rounded-3xl bg-white text-black p-3 w-full md:w-1/2 lg:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1000px] bg-[#AB95F991] text-white rounded-full px-10 py-5 font-semibold flex justify-between items-center">
            <span className="w-1/12 text-center">SL.NO</span>
            <span className="w-2/12 text-center">Name</span>
            <span className="w-2/12 text-center">Email</span>
            <span className="w-2/12 text-center">Mobile</span>
            <span className="w-2/12 text-center">Designation</span>
            <span className="w-2/12 text-center">Reason</span>
            <span className="w-2/12 text-center">Apply Date</span>
            <span className="w-1/12 text-center">Status</span>
          </div>

          <div className="bg-[#FFFFFFD1] border border-[#9DCAF908] mt-10 p-4 flex flex-col gap-3 rounded-3xl min-w-[1000px]">
            {filteredResignations.length > 0 ? (
              filteredResignations.map((res, index) => (
                <div
                  key={res.id || index}
                  className="flex justify-between items-center p-3 bg-[#AB95F987] rounded-xl"
                >
                  <span className="w-1/12 text-center">{index + 1}</span>
                  <span className="w-2/12 text-center">{res.fullName}</span>
                  <span className="w-2/12 text-center">{res.emailId}</span>
                  <span className="w-2/12 text-center">{res.mobileNo}</span>
                  <span className="w-2/12 text-center">{res.designation}</span>
                  <span className="w-2/12 text-center">{res.reason}</span>
                  <span className="w-2/12 text-center">{res.dateOfApplying}</span>
                  <span className="w-1/12 text-center">{res.status || 'Pending'}</span>
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
