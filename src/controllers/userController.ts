import pool from "../models/model";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    }

    catch (err) {
        res.status(500).json({ Internal: "Error" });
        console.log(err);
    }
}

export const registerUsers = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
        const hash = await Bun.password.hash(password);
        const result = await pool.query("INSERT INTO users (username, password) VALUES ($1 ,$2)", [name, hash]);
        res.status(201).json({ User: result.username })
    }
    catch (err) {
        res.status(500).json({ Interval: "Error" });
    }

}

export const loginUsers = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
        let user = pool.query("SELECT * FROM users WHERE username = $1", [name])

        if (!user) {
            return res.status(404).json({ User: "Not Found" })
        }

        const hash = await Bun.password.hash(password);
        
        let isValid = await Bun.password.verify(password, hash)

        if (!isValid) {
            return res.status(400).json({ User: "Invalid"})
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: "1h" }); 

        res.json({ Login: "Sucessed", token })

    }

    catch (err) {
        res.status(500).json({ Interval: "Error" });
        console.log(err);
    }
}

export const deleteUsers = async (req: Request, res: Response) => {
    const { password } = req.body;

    const { id } = req.params;

    try {
        const { rows } = await pool.query("SELECT password FROM users WHERE id = $1", [id])

        const dbPassword = rows[0].password;
        let isValid = await Bun.password.verify(password, dbPassword);

        if (isValid) {
            const resp = await pool.query("DELETE FROM users WHERE id = $1", [id]);
            res.json({ User: "deleted"})
        }
        
    }
    catch (err) {
        res.status(500).json({ Interval: "Error" });
        console.log(err);
    }
}
