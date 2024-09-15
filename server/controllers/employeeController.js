
const Employee = require('../models/Employee');

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
  const f_Image = req.file ? req.file.path : '';

  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });

    employee.f_Id = f_Id || employee.f_Id;
    employee.f_Image = f_Image || employee.f_Image;
    employee.f_Name = f_Name || employee.f_Name;
    employee.f_Email = f_Email || employee.f_Email;
    employee.f_Mobile = f_Mobile || employee.f_Mobile;
    employee.f_Designation = f_Designation || employee.f_Designation;
    employee.f_gender = f_gender || employee.f_gender;
    employee.f_Course = f_Course || employee.f_Course;

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });

  
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Employee removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


