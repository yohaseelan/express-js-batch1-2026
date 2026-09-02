const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

const { deleteStudent, getAllStudents, getStudentById } = require('../controllers/StudentApiController.js');
router.delete('/:id', deleteStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);

module.exports = router;