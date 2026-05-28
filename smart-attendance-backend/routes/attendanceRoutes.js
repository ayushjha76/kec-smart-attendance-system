const express = require("express");
const router = express.Router();

const connection = require("../config/db");

router.post("/attendance", (req, res) => {
  const attendanceData = req.body;

  attendanceData.forEach((student) => {
    const query =
      "INSERT INTO attendance (student_id, status, date) VALUES (?, ?, ?)";

    connection.query(
      query,
      [
        student.student_id,
        student.status,
        student.date,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });

  res.json({
    message: "Attendance Saved Successfully",
  });
});

router.get("/attendance/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  const query = `
    SELECT 
      COUNT(*) AS total_classes,
      SUM(status = 'Present') AS present_classes
    FROM attendance
    WHERE student_id = ?
  `;

  connection.query(
    query,
    [studentId],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Error fetching attendance",
        });
      } else {
        const total =
          result[0].total_classes || 0;

        const present =
          result[0].present_classes || 0;

        const percentage =
          total === 0
            ? 0
            : ((present / total) * 100).toFixed(2);

        res.json({
          total_classes: total,
          present_classes: present,
          percentage,
        });
      }
    }
  );
});
module.exports = router;