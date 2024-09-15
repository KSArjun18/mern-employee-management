import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Topbar from "../components/Topbar.js";
import EmployeeModal from '../components/EmployeeModal';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/authService';
import { Pagination } from './Pagination.js';

function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    f_Id: '',
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: [],
    password: '',
    f_Image: null,
  });
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getEmployees();
        setEmployees(employeesData);
      } catch (error) {
        toast.error('Failed to load employees');
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    setFilteredEmployees(
      employees.filter((emp) =>
        Object.values(emp).some((value) =>
          value.toString().toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )
    );
  }, [searchKeyword, employees]);

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;
    if (name === 'f_Course') {
      setNewEmployee(prevState => ({
        ...prevState,
        [name]: checked
          ? [...prevState.f_Course, value]
          : prevState.f_Course.filter(course => course !== value),
      }));
    } else {
      setNewEmployee({
        ...newEmployee,
        [name]: name === 'f_Image' ? files[0] : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployeeId) {
        await updateEmployee(editingEmployeeId, newEmployee);
        setEmployees(
          employees.map((emp) =>
            emp._id === editingEmployeeId ? { ...newEmployee, _id: editingEmployeeId } : emp
          )
        );
        toast.success('Employee updated successfully!');
      } else {
        const createdEmployee = await createEmployee(newEmployee);
        setEmployees([...employees, createdEmployee]);
        toast.success('Employee created successfully!');
      }
      resetForm();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting employee');
    }
  };

  const resetForm = () => {
    setNewEmployee({
      f_Id: '',
      f_Name: '',
      f_Email: '',
      f_Mobile: '',
      f_Designation: '',
      f_gender: '',
      f_Course: [],
      password: '',
      f_Image: null,
    });
    setEditingEmployeeId(null);
  };

  const handleEdit = (employee) => {
    setNewEmployee({
      f_Id: employee.f_Id,
      f_Name: employee.f_Name,
      f_Email: employee.f_Email,
      f_Mobile: employee.f_Mobile,
      f_Designation: employee.f_Designation,
      f_gender: employee.f_gender,
      f_Course: employee.f_Course,
      password: '',
      f_Image: null,
    });
    setEditingEmployeeId(employee._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((emp) => emp._id !== id));
      toast.success('Employee deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting employee');
    }
  };

  // Calculate paginated data
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Topbar />
      <h1>Employee Dashboard</h1>

      {/* Search input */}
      <div className='d-flex justify-content-center flex-column align-content-center align-items-center'>
        <div className='col-lg-4 rounded-5'>
          <div className="mb-4 rounded-5">
            <input
              type="text"
              placeholder="Search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="form-control mr-3 rounded-5"
            />
          </div>
        </div>
        <div className='col-lg-4'>
          <h4 className="ml-3 text-center">Total Employees: {filteredEmployees.length}</h4>
        </div>
      </div>

      <div className='d-flex justify-content-end me-5'>
        <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
          Create Employee
        </button>
      </div>

      {/* Employee Table */}
      <div className='container-fluid'>
        <div className='table-responsive'>
          <table className="table table-hover table-striped table-bordered t-bodys">
            <thead className="thead-dark">
              <tr className='t-body'>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.f_Id}</td>
                  <td>
                    {emp.f_Image ? (
                      <img
                        src={`http://localhost:5000/${emp.f_Image}`}
                        alt={emp.f_Name}
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{emp.f_Name}</td>
                  <td>{emp.f_Email}</td>
                  <td>{emp.f_Mobile}</td>
                  <td>{emp.f_Designation}</td>
                  <td>{emp.f_gender}</td>
                  <td>{emp.f_Course}</td>
                  <td>{new Date(emp.createdDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredEmployees.length}
          paginate={paginate}
        />
      </div>

      {/* Employee Modal */}
      <EmployeeModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
        newEmployee={newEmployee}
        handleChange={handleChange}
        editingEmployeeId={editingEmployeeId}
      />
    </div>
  );
}

export default EmployeeDashboard;
