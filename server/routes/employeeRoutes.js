
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, employeeController.getEmployees);
router.get('/:id', authMiddleware, employeeController.getEmployeeById);
router.put('/:id', authMiddleware, upload.single('f_Image'), employeeController.updateEmployee);
router.delete('/:id', authMiddleware, employeeController.deleteEmployee);

module.exports = router;
