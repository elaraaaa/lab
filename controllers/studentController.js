const Student = require('../models/Student');

// GET all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE student (with validation)
exports.createStudent = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;

        // Validation
        if (!firstName || !lastName || !email) {
            return res.status(400).json({
                error: 'firstName, lastName, and email are required.'
            });
        }

        const student = await Student.create(req.body);
        res.status(201).json(student);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE student (with 404 check)
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        // Check if exists
        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        await student.update(req.body);
        res.json({ message: 'Student updated' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET student by ID
exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const Course = require('../models/Course');

        const student = await Student.findByPk(id, {
            include: [{ model: Course, as: 'course' }]
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        res.json(student);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE student (with 404 check)
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        // Check if exists
        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        await student.destroy();
        res.json({ message: 'Student deleted' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};