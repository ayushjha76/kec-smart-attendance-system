const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const connection = require("../config/db");

const SECRET_KEY = "smart_attendance_secret";

/* ---------------- LOGIN ---------------- */

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  connection.query(
    query,
    [email, password],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }

      if (result.length > 0) {

        const user = result[0];

        /* CREATE TOKEN */

        const token = jwt.sign(
          {
            id: user.id,
            role: user.role,
          },
          SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );

        return res.json({
          success: true,
          token,
          user,
        });

      }

      else {

        return res.status(401).json({
          success: false,
          message:
            "Invalid Email or Password",
        });

      }
    }
  );
});

module.exports = router;