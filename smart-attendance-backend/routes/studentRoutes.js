const express = require("express");
const router = express.Router();

const connection = require("../config/db");

/* ---------------- GET ALL STUDENTS ---------------- */

router.get("/students", (req, res) => {
  const query = "SELECT * FROM students";

  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Error fetching students",
      });
    } else {
      res.json(result);
    }
  });
});

/* ---------------- ADD STUDENT ---------------- */

router.post("/students", (req, res) => {
  const {
    name,
    roll_no,
    branch,
    section,
    semester,
  } = req.body;

  const query =
    "INSERT INTO students (name, roll_no, branch, section, semester) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    query,
    [name, roll_no, branch, section, semester],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Error adding student",
        });
      } else {
        res.json({
          message: "Student Added Successfully",
        });
      }
    }
  );
});

/* ---------------- DELETE STUDENT ---------------- */

router.delete("/students/:id", (req, res) => {
  const studentId = req.params.id;

  const query =
    "DELETE FROM students WHERE id = ?";

  connection.query(
    query,
    [studentId],
    (err, result) => {
      if (err) {
        console.log(err);

        res.status(500).json({
          message: "Error deleting student",
        });
      } else {
        res.json({
          message:
            "Student Deleted Successfully",
        });
      }
    }
  );
});

module.exports = router;