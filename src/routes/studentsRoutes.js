const express = require("express");
const studentsController = require("../controllers/studentsController");

const router = express.Router();

router.post("/:id/register", async (req, res) => {
  const courseId = req.params.id;
  const { name, email, phone_number, linkedin_profile } = req.body;

  try {
    await studentsController.registerStudent(
      courseId,
      name,
      email,
      phone_number,
      linkedin_profile
    );
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
  }
});

router.put("/:id/status", async (req, res) => {
  const studentId = req.params.id;
  const { status } = req.body;

  try {
    await studentsController.updateStudentStatus(studentId, status);
    res.status(200).json({ message: "Student status updated successfully!" });
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({ message: err.message });
  }
});

// Add other student routes...

module.exports = router;
