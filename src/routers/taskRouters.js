import { Router } from "express";
import {getTasks, getTask, createTask, updateTask, deleteTask} from "../controllers/taskController.js";
import {validateAuthToken} from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validateSchema.js";
import {createTaskSchema} from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", validateAuthToken, getTasks);
router.get("/tasks/:id", validateAuthToken, getTask);

router.post("/tasks", validateAuthToken, validateSchema(createTaskSchema), createTask);
router.delete("/tasks/:id", validateAuthToken, deleteTask);
router.put("/tasks/:id", validateAuthToken, updateTask);

export default router;