import express from "express";
import auth from "../middleware/auth.js";
import { pool } from "../config/db.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  if (!req.body.task) return res.status(400).json("Task required");

  const todo = await pool.query(
    "INSERT INTO todos(user_id,task) VALUES($1,$2) RETURNING *",
    [req.user.id, req.body.task]
  );
  res.json(todo.rows[0]);
});

router.get("/", auth, async (req, res) => {
  const todos = await pool.query(
    "SELECT * FROM todos WHERE user_id=$1 ORDER BY created_at DESC",
    [req.user.id]
  );
  res.json(todos.rows);
});

router.delete("/:id", auth, async (req, res) => {
  await pool.query(
    "DELETE FROM todos WHERE id=$1 AND user_id=$2",
    [req.params.id, req.user.id]
  );
  res.json("Todo deleted");
});

export default router;
