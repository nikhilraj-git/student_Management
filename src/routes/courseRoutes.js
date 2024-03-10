const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.post("/", async (req, res) => {
  const { instructor_id, name, description, max_seats, start_date } = req.body;

  try {
    const courseId = await courseController.createCourse(
      instructor_id,
      name,
      description,
      max_seats,
      start_date
    );
    res.status(201).json({ message: "Course created successfully!", courseId });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const courseId = req.params.id;
  const { name, description, max_seats, start_date } = req.body;

  try {
    await courseController.updateCourse(
      courseId,
      name,
      description,
      max_seats,
      start_date
    );
    res.status(200).json({ message: "Course details updated successfully!" });
  } catch (err) {
    console.error("Error updating course:", err);
    if (err.message === "Course not found") {
      res.status(404).json({ message: "Course not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.get("/courses/:id", courseController.getCourse); // Add other course routes...

module.exports = router;
