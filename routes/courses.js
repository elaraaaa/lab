const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// GET by ID route - must be ABOVE other routes
router.get('/:id', courseController.getCourseById);

router.get('/', courseController.getCourses);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;