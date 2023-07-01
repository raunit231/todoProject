import express from 'express';
import { createTask,updateTask, deleteTask, getUserTasks, updateTaskDone,updateTaskTimer } from '../controllers/task.js'

const router= express.Router();

router.post("/",createTask);
router.patch("/:id",updateTask);
router.patch("/:id/completed",updateTaskDone);
router.patch("/:id/timer",updateTaskTimer);
router.delete("/:id",deleteTask);
router.get("/:userId/tasks",getUserTasks);

export default router;