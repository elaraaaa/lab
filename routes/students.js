const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

const studentController = require('../controllers/studentController');

// GET by ID route - must be ABOVE other routes
router.get('/:id', studentController.getStudentById);

// CRUD routes
router.get('/', studentController.getStudents);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

// Enrollment routes
// ENROLL - POST /students/:id/enroll
router.post('/:id/enroll', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }
        const { courseId } = req.body;
        await student.addEnrolledCourse(courseId);
        res.json({ message: 'Enrolled successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UNENROLL - DELETE /students/:id/unenroll
router.delete('/:id/unenroll', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }
        const { courseId } = req.body;
        await student.removeEnrolledCourse(courseId);
        res.json({ message: 'Unenrolled successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LIST COURSES - GET /students/:id/courses
router.get('/:id/courses', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }
        const courses = await student.getEnrolledCourses();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;