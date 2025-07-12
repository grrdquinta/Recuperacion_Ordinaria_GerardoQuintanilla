import express from 'express';
import studentController from '../controller/studentsController.js';

const router = express.Router();

router.route('/')
    .get(studentController.getStudents)
    .post(studentController.createStudent);

router.route('/:id')
    .get(studentController.getStudentById)
    .put(studentController.updateStudent)
    .delete(studentController.deleteStudent);

export default router;