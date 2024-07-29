import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied: No Authorization header provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_KEY);
        req.user = user;

        // Fetch user from the database to check role
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [user.id]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }
        console.log(rows)

        req.user.role = rows[0].role;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid Token' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied: Admins only' });
    }
    next();
};
