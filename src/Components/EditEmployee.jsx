// ✅ Updated EditEmployee.jsx
import React, { useState, useEffect } from 'react';
import EmployeeService from "../ApiServices/EmployeeService";
import { toast } from 'react-toastify';

const EditEmployee = ({ onClose, onUpdate, initialData }) => {
  const [form, setForm] = useState({
    email: '',
    empId: '',
    id: '',
    name: '',
    mobile: '',
    role: '',
    designation: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      email: initialData?.emailId || '',
      empId: initialData?.empId || '',
      id: initialData?.id || '',
      name: initialData?.fullName || '',
      mobile: initialData?.mobileNo || '',
      role: initialData?.role || '',
      designation: initialData?.designation || ''
    });
  }, [initialData]);

  const validateField = (name, value) => {
    let message = '';
    switch (name) {
      case 'empId':
        if (!value.trim()) message = 'Employee ID is required.';
        else if (!/^[a-zA-Z0-9]{3,}$/.test(value)) message = 'Employee ID must be alphanumeric and at least 3 characters.';
        break;
      case 'name':
        if (!value.trim()) message = 'Name is required.';
        else if (!/^[a-zA-Z\s]{3,}$/.test(value)) message = 'Only letters & spaces allowed (min 3).';
        break;
      case 'email':
        if (!value.trim()) message = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Invalid email format.';
        break;
      case 'mobile':
        if (!value.trim()) message = 'Phone number is required.';
        else if (!/^[6-9]\d{9}$/.test(value)) message = 'Must be 10 digits starting with 6-9.';
        break;
      case 'designation':
        if (!value.trim()) message = 'Designation is required.';
        break;
      case 'role':
        if (!value.trim()) message = 'Role is required.';
        break;
      default:
        break;
    }
    return message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.entries(form).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const updatedPayload = {
        empId: form.empId,
        fullName: form.name,
        mobileNo: form.mobile,
        emailId: form.email,
        designation: form.designation,
        role: form.role,
        status: "request"
      };

      EmployeeService.updateEmployeeById(form.id, updatedPayload)
        .then(() => {
          toast.success("Employee updated successfully!");
          onUpdate({ id: form.id, ...updatedPayload });
          onClose();
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
          if (error.response?.status === 409) {
            toast.error("Mobile number already exists.");
          } else if (error.response?.status === 404) {
            toast.error("Employee not found.");
          } else {
            toast.error("Failed to update employee.");
          }
        });
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xl bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#2A4455] text-white rounded-3xl p-10 w-[700px] shadow-lg">
        <h2 className="text-2xl font-semibold mb-8 text-center">Edit Details</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-3 mt-1 rounded-md border border-gray-300 text-black bg-[#FFFFFF8A]" />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label>Employee ID</label>
            <input type="text" name="empId" value={form.empId} onChange={handleChange} className="w-full p-3 mt-1 rounded-md border border-gray-300 text-black bg-[#FFFFFF8A]" />
            {errors.empId && <p className="text-red-400 text-sm mt-1">{errors.empId}</p>}
          </div>

          <div>
            <label>Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-3 mt-1 rounded-md border border-gray-300 text-black bg-[#FFFFFF8A]" />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange} className="w-full p-3 mt-1 rounded-md border border-gray-300 text-black bg-[#FFFFFF8A]">
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
            </select>
            {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
          </div>

          <div>
            <label>Designation</label>
            <select name="designation" value={form.designation} onChange={handleChange} className="w-full p-3 mt-1 rounded-md border border-gray-300 text-black bg-[#FFFFFF8A]">
              <option value="">Select Designation</option>
              
<optgroup label="Core Engineering">
<option>Software Intern</option>
<option>Junior Developer</option>
<option>Associate Software Engineer</option>
<option>Graduate Trainee</option>
<option>Trainee Developer</option>
<option>Software Engineer</option>
<option>Backend Developer</option>
<option>Frontend Developer</option>
<option>Full Stack Developer</option>
<option>Java Developer</option>
<option>.NET Developer</option>
<option>Python Developer</option>
<option>Senior Software Engineer</option>
<option>Lead Software Engineer</option>
<option>Staff Engineer</option>
<option>Principal Engineer</option>
<option>Distinguished Engineer</option>
</optgroup>
 
 
<optgroup label="DevOps / SRE / Infra">
<option>DevOps Intern</option>
<option>Junior SRE</option>
<option>Infrastructure Associate</option>
<option>CI/CD Engineer</option>
<option>DevOps Engineer</option>
<option>Cloud Engineer</option>
<option>Build & Release Engineer</option>
<option>Site Reliability Engineer</option>
<option>Senior DevOps Engineer</option>
<option>Staff SRE</option>
<option>Principal SRE</option>
<option>Infrastructure Architect</option>
<option>Cloud Architect</option>
</optgroup>
 
  
<optgroup label="Security">
<option>Security Analyst Intern</option>
<option>SOC Analyst</option>
<option>Risk Analyst</option>
<option>Security Engineer</option>
<option>InfoSec Engineer</option>
<option>IAM Engineer</option>
<option>Senior Security Engineer</option>
<option>Cybersecurity Architect</option>
<option>Chief Information Security Officer (CISO)</option>
</optgroup>
 
<optgroup label="Data / AI / ML">
<option>Data Analyst</option>
<option>ML Intern</option>
<option>BI Developer</option>
<option>Data Engineer</option>
<option>ML Engineer</option>
<option>Data Scientist</option>
<option>Senior Data Scientist</option>
<option>AI Research Scientist</option>
<option>Head of Data Science</option>
</optgroup>
 

<optgroup label="UI/UX and Design">
<option>UI/UX Intern</option>
<option>Visual Designer</option>
<option>Interaction Designer</option>
<option>UX Designer</option>
<option>UI Engineer</option>
<option>Product Designer</option>
<option>Senior UX Architect</option>
<option>Head of Design</option>
<option>Chief Design Officer</option>
</optgroup>
 
 
<optgroup label="QA / Testing">
<option>QA Intern</option>
<option>Manual Tester</option>
<option>Junior Test Engineer</option>
<option>QA Engineer</option>
<option>Automation Tester</option>
<option>Performance Tester</option>
<option>Senior QA Engineer</option>
<option>SDET</option>
<option>Test Architect</option>
</optgroup>
 
  
<optgroup label="Product / Project Management">
<option>Product Analyst</option>
<option>Project Coordinator</option>
<option>Business Analyst (BA)</option>
<option>Scrum Master</option>
<option>Product Manager</option>
<option>Technical Product Manager</option>
<option>Program Manager</option>
<option>Principal Product Manager</option>
<option>Director of Product</option>
</optgroup>

<optgroup label="Support / Tech Ops">
<option>L1 Support Engineer</option>
<option>L2 Support Engineer</option>
<option>L3 Technical Support</option>
<option>Helpdesk Technician</option>
<option>Application Support Engineer</option>
<option>Support Team Lead</option>
<option>Monitoring Analyst</option>
<option>Tech Ops Associate</option>
<option>NOC Manager</option>
</optgroup>
 
  
<optgroup label="Leadership / Architecture">
<option>Team Lead</option>
<option>Technical Lead</option>
<option>Engineering Manager</option>
<option>Solutions Architect</option>
<option>Software Architect</option>
<option>Enterprise Architect</option>
<option>Director of Engineering</option>
<option>VP of Engineering</option>
<option>Chief Technology Officer (CTO)</option>
</optgroup>
 

<optgroup label="Specialized / Emerging">
<option>Blockchain Developer</option>
<option>Game Developer</option>
<option>Embedded Software Engineer</option>
<option>Mobile App Developer</option>
<option>Android Developer</option>
<option>iOS Developer</option>
<option>AR/VR Engineer</option>
<option>No-Code Developer</option>
<option>Low-Code Developer</option>
<option>API Developer</option>
<option>Technical Consultant</option>
<option>Solution Delivery Consultant</option>
</optgroup>
            </select>
            {errors.designation && <p className="text-red-400 text-sm mt-1">{errors.designation}</p>}
          </div>

          <div>
            <label>Mobile Number</label>
            <input type="text" name="mobile" value={form.mobile} onChange={handleChange} className="w-full p-3 mt-1 rounded-md border border-gray-300 text-black bg-[#FFFFFF8A]" />
            {errors.mobile && <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>}
          </div>
        </div>

        <div className="flex justify-center mt-10 gap-6">
          <button
            onClick={onClose}
            className="bg-[#0B0E74] px-10 py-3 text-white text-lg rounded-full hover:bg-blue-900"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#0B0E74] px-10 py-3 text-white text-lg rounded-full hover:bg-blue-900"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
