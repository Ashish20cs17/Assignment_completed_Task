const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Get all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks ORDER BY created_at DESC", (err, results) => {
    if (err) return res.json({ error: err });
    res.json(results);
  });
});

// Add task
app.post("/tasks", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task cannot be empty" });

  db.query("INSERT INTO tasks (task) VALUES (?)", [task], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ success: true, id: result.insertId });
  });
});

// Mark completed
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE tasks SET status='Completed' WHERE id=?",
    [id],
    (err) => {
      if (err) return res.json({ error: err });
      res.json({ success: true });
    }
  );
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id=?", [id], (err) => {
    if (err) return res.json({ error: err });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
