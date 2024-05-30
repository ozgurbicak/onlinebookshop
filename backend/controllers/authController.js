import connectionDB from "../config/db.js";

export const login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  connectionDB.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database query error" });
    }

    if (results.length > 0 && password === results[0].password) {
      res.send({ success: true, message: "Login successful" });
    } else {
      res.send({ success: false, message: "Invalid email or password" });
    }
  });
};

export const register = (req, res) => {
  const { full_name, email, phone_number, password, confirmPassword } =
    req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match" });
  }

  const checkUserSql = "SELECT * FROM users WHERE email = ?";

  connectionDB.query(
    checkUserSql,
    [email],
    (checkUserErr, checkUserResults) => {
      if (checkUserErr) {
        console.error("Database query error:", checkUserErr);
        return res
          .status(500)
          .json({ success: false, message: "User creation failed" });
      }

      if (checkUserResults.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Email is already in use" });
      }

      const insertUserSql =
        "INSERT INTO users (full_name, email, phone_number, password) VALUES (?, ?, ?, ?)";
      connectionDB.query(
        insertUserSql,
        [full_name, email, phone_number, password],
        (insertUserErr, insertUserResults) => {
          if (insertUserErr) {
            console.error("Database query error:", insertUserErr);
            return res
              .status(500)
              .json({ success: false, message: "User creation failed" });
          }
          res
            .status(201)
            .json({ success: true, message: "User created successfully" });
        }
      );
    }
  );
};
