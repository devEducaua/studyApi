import express from 'express';
import { deleteUsers, getUsers, loginUsers, registerUsers } from '../controllers/userController.ts';
import { getTasks } from '../controllers/taskController.ts';

const router = express.Router();

router.get("/users", getUsers);
router.post("/register", registerUsers);
router.post("/login", loginUsers);
router.delete("/user/:id", deleteUsers);

router.get("/tasks", getTasks);

export default router;
