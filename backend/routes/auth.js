import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../config/db.js";

dotenv.config();
const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json("All fields are required");

  const hashed = await bcrypt.hash(password, 10);

  const user = await pool.query(
    "INSERT INTO users(username,email,password) VALUES($1,$2,$3) RETURNING *",
    [username, email, hashed]
  );

  res.json(user.rows[0]);
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json("All fields are required");

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (user.rows.length === 0)
    return res.status(401).json("Invalid email");

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(401).json("Invalid password");

  const token = jwt.sign(
    {
      id: user.rows[0].id,
      username: user.rows[0].username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export default router;
