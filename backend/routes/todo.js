import express from "express";
import auth from "../middleware/auth.js";
import { pool } from "../config/db.js";

const router = express.Router();

/* CREATE TODO */
router.post("/", auth, async (req, res) => {
  const { task } = req.body;

  const todo = await pool.query(
    "INSERT INTO todos (user_id, task) VALUES ($1,$2) RETURNING *",
    [req.user.id, task]
  );

  res.json(todo.rows[0]);
});

/* GET TODOS */
router.get("/", auth, async (req, res) => {
  const todos = await pool.query(
    "SELECT * FROM todos WHERE user_id=$1 ORDER BY created_at DESC",
    [req.user.id]
  );

  res.json(todos.rows);
});

/* DELETE TODO */
router.delete("/:id", auth, async (req, res) => {
  await pool.query(
    "DELETE FROM todos WHERE id=$1 AND user_id=$2",
    [req.params.id, req.user.id]
  );

  res.json("Todo deleted");
});

export default router;
