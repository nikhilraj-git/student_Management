const express = require("express");
const instructorController = require("../controllers/instructorController");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, name, email } = req.body;

  try {
    const instructorId = await instructorController.createInstructor(
      title,
      name,
      email
    );
    res
      .status(201)
      .json({ message: "Instructor created successfully!", instructorId });
  } catch (err) {
    console.error("Error creating instructor:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add other instructor routes...

module.exports = router;
