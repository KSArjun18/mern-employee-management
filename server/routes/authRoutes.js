
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/upload');

// Register Employee
router.post(
  '/register',
  upload.single('f_Image'),
  [
    check('f_Email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  authController.createEmployee
);

// Login Employee
router.post(
  '/login',
  [
    check('f_Email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.loginEmployee
);

// Logout Employee
router.post('/logout', authController.logoutEmployee);

module.exports = router;
