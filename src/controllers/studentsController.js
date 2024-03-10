const { executeQuery } = require("../database");

module.exports = {
  registerStudent: async (
    courseId,
    name,
    email,
    phone_number,
    linkedin_profile
  ) => {
    try {
      const leadExistsSql = `SELECT * FROM Students WHERE course_id = ? AND email = ?`;
      const existingLead = await executeQuery(leadExistsSql, [courseId, email]);
      if (existingLead.length > 0) {
        throw {
          status: 409,
          message: "User already registered for this course",
        };
      }

      const sql = `INSERT INTO Students (course_id, name, email, phone_number, linkedin_profile) VALUES (?, ?, ?, ?, ?)`;
      await executeQuery(sql, [
        courseId,
        name,
        email,
        phone_number,
        linkedin_profile,
      ]);
    } catch (err) {
      console.error("Error registering student:", err);
      throw err;
    }
  },

  updateStudentStatus: async (studentId, status) => {
    try {
      const sql = `UPDATE Students SET status = ? WHERE id = ?`;
      const result = await executeQuery(sql, [status, studentId]);
      if (result.affectedRows === 0) {
        throw { status: 404, message: "Student not found" };
      }
    } catch (err) {
      console.error("Error updating student status:", err);
      throw err;
    }
  },

  // Add other student-related functions...
};
