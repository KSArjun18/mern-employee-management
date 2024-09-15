const mongoose = require('mongoose'); 

const EmployeeSchema = new mongoose.Schema({
  f_Id: { type: String, required: true },
  f_Image: { type: String },
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true, unique: true },
  f_Mobile: { type: String },
  f_Designation: { type: String },
  f_gender: { type: String },
  f_Course: { type: String },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now } 
}, { timestamps: true }); 


module.exports = mongoose.model('Employee', EmployeeSchema);
