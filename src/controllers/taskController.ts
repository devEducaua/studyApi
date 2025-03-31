import pool from '../models/model.ts'
import { Request, Response } from "express";

export const getTasks = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM tasks");
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ Internal: "Error" })
    }
}

export const createTasks = async (req: Request, res: Response) => {
    const { task_name } = req.body;

    try {
        pool.query("INSERT INTO tasks ()")

    }

    catch (err) {
        res.status(500).json({ Internal: "Error" })
    }
}
