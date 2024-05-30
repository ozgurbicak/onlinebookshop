import connectionDB from "../config/db.js";

export const getUsers = (req, res) => {
  connectionDB.query("SELECT * FROM users", (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching data." });
    }
    return res.json({ success: true, data });
  });
};

export const getBooks = (req, res) => {
  connectionDB.query("SELECT * FROM books", (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching data." });
    }
    return res.json({ success: true, data });
  });
};
