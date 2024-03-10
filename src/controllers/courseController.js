const { executeQuery } = require("../database");

module.exports = {
  createCourse: async (
    instructor_id,
    name,
    description,
    max_seats,
    start_date
  ) => {
    try {
      const sql = `INSERT INTO Courses (instructor_id, name, description, max_seats, start_date) VALUES (?, ?, ?, ?, ?)`;
      const result = await executeQuery(sql, [
        instructor_id,
        name,
        description,
        max_seats,
        start_date,
      ]);
      return result.insertId;
    } catch (err) {
      console.error("Error creating course:", err);
      throw err;
    }
  },

  updateCourse: async (courseId, name, description, max_seats, start_date) => {
    try {
      const sql = `UPDATE Courses SET name = ?, description = ?, max_seats = ?, start_date = ? WHERE id = ?`;
      const result = await executeQuery(sql, [
        name,
        description,
        max_seats,
        start_date,
        courseId,
      ]);
      if (result.affectedRows === 0) {
        throw new Error("Course not found");
      }
    } catch (err) {
      console.error("Error updating course:", err);
      throw err;
    }
  },
  getCourse: async (req, res) => {
    const courseId = req.params.id;

    try {
      const sql = "SELECT * FROM Courses WHERE id = ?";
      const result = await executeQuery(sql, [courseId]);

      if (result.length === 0) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.status(200).json(result[0]);
    } catch (err) {
      console.error("Error getting course:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
