import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import auth from "./routes/auth.js";
import todo from "./routes/todo.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/todos", todo);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
