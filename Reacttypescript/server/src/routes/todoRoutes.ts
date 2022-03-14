import { Router } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller";

const router = Router();

router.post("/post", createTodo);
router.get("/post", getTodos);
router.put("/post/:id", updateTodo);
router.delete("/post/:id", deleteTodo);
export default router;