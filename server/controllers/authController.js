const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, password } = req.body;
  const f_Image = req.file ? req.file.path : '';

  try {
    let employee = await Employee.findOne({ f_Email });

    if (employee) {
      return res.status(400).json({ msg: 'Employee already exists' });
    }

    employee = new Employee({
      f_Id,
      f_Image,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(password, salt);
    await employee.save();

    const payload = { user: { id: employee.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        console.error('Error signing token:', err);
        return res.status(500).json({ msg: 'Server error' });
      }
      res.json({ token });
    });
  } catch (err) {
    console.error('Error creating employee:', err.message); 
    res.status(500).send('Server error');
  }
};


exports.loginEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { f_Email, password } = req.body;
  console.log(`Email received: ${f_Email}`);
  console.log(`Password received: ${password}`);

  try {
    let employee = await Employee.findOne({ f_Email });
    console.log('Employee not found:', f_Email);

    if (!employee) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: { id: employee.id },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.logoutEmployee = (req, res) => {
  res.json({ msg: 'Logout successful' });
};
