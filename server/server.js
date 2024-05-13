const PORT = 8000;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json());

// get a todos
app.get("/todos/:userEmail", async (req, res) => {
  console.log(req);
  const { userEmail } = req.params;
  console.log(userEmail);
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    res.json(todos.rows);
  } catch (err) {
    console.error(err);
  }
});

// create a bew tidi
app.post("/todos", async (req, res) => {
  console.log("bodyyyyyyyy", req.body);
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  const id = uuidv4();
  try {
    const newToDo = await pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date]
    );
    res.json(newToDo);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
