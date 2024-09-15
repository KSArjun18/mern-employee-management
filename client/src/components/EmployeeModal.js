import React from 'react';

const EmployeeModal = ({ showModal, setShowModal, handleSubmit, newEmployee, handleChange, editingEmployeeId }) => {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editingEmployeeId ? 'Edit Employee' : 'Create Employee'}</h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}>&times;</button>
          </div>
          <div className="modal-body bg-black options_back">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="f_Id"
                placeholder="ID"
                value={newEmployee.f_Id}
                onChange={handleChange}
                required
                className="form-control mb-2"
              />
              <input
                type="text"
                name="f_Name"
                placeholder="Name"
                value={newEmployee.f_Name}
                onChange={handleChange}
                required
                className="form-control mb-2"
              />
              <input
                type="email"
                name="f_Email"
                placeholder="Email"
                value={newEmployee.f_Email}
                onChange={handleChange}
                required
                className="form-control mb-2"
              />
              <input
                type="text"
                name="f_Mobile"
                placeholder="Mobile"
                value={newEmployee.f_Mobile}
                onChange={handleChange}
                required
                className="form-control mb-2"
              />
              <select
                name="f_Designation"
                value={newEmployee.f_Designation}
                onChange={handleChange}
                required
                className="form-control mb-2"
              >
                <option value="">Select Designation</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                {/* Add more options as needed */}
              </select>
              <div className="mb-2 d-flex">
                <label className='text-white'>Gender</label>
                <div>
                  <input
                  className='ms-5'
                    type="radio"
                    name="f_gender"
                    value="Male"
                    checked={newEmployee.f_gender === 'Male'}
                    onChange={handleChange}
                    required
                  />
                  <label className='text-white' >Male</label>
                </div>
                <div>
                  <input
                   className='ms-5'
                    type="radio"
                    name="f_gender"
                    value="Female"
                    checked={newEmployee.f_gender === 'Female'}
                    onChange={handleChange}
                    required
                  />
                  <label className='text-white'>Female</label>
                </div>
              
              </div>
              <div className="mb-2 d-flex">
                <label  className='text-white'>Course</label>
                <div>
                  <input
                   className='ms-5'
                    type="checkbox"
                    name="f_Course"
                    value="JavaScript"
                    checked={newEmployee.f_Course.includes('JavaScript')}
                    onChange={handleChange}
                  />
                  <label  className='text-white'>JavaScript</label>
                </div>
                <div>
                  <input
                   className='ms-5'
                    type="checkbox"
                    name="f_Course"
                    value="React"
                    checked={newEmployee.f_Course.includes('React')}
                    onChange={handleChange}
                  />
                  <label  className='text-white'>React</label>
                </div>
                <div>
                  <input
                   className='ms-5'
                    type="checkbox"
                    name="f_Course"
                    value="Node.js"
                    checked={newEmployee.f_Course.includes('Node.js')}
                    onChange={handleChange}
                  />
                  <label  className='text-white'>Node.js</label>
                </div>
             
              </div>
              {!editingEmployeeId && (
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newEmployee.password}
                  onChange={handleChange}
                  required
                  className="form-control mb-2"
                />
              )}
              <input
                type="file"
                name="f_Image"
                onChange={handleChange}
                className="form-control mb-2"
              />
              <button type="submit" className="btn btn-success">
                {editingEmployeeId ? 'Update Employee' : 'Create Employee'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
