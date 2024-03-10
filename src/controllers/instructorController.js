const { executeQuery } = require("../database");

module.exports = {
  createInstructor: async (title, name, email) => {
    try {
      const sql = `INSERT INTO Instructors (title, name, email) VALUES (?, ?, ?)`;
      const result = await executeQuery(sql, [title, name, email]);
      return result.insertId;
    } catch (err) {
      console.error("Error creating instructor:", err);
      throw err;
    }
  },

  // Add other instructor-related functions...
};
