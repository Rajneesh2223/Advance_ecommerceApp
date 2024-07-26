import pool from "../config/db.js";

export  async function createUser(req, res) {
    const { username, email, password_hash, role } = req.body;
    if (!username || !email || !password_hash || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const [result] = await pool.query(
            `INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)`,
            [username, email, password_hash, role]
        );
        res.status(201).json({ id: result.insertId, message: "User created successfully" });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: "Internal server error" }); 
    }
}

export  async function getUser(req,res){
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateUser(req,res){
    const {id} = req.params;
    const {username,email,password_hash,role}=req.body;
    try{
        const [result]= await pool.query(
            `
            UPDATE users SET username = ?, email = ?, password_hash = ?, role = ? WHERE id = ? 
            `,[username , email, password_hash, role ,id]
        )
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deleteUser(req,res){
    const {id} = req.params;
    try{
        const [result]= await pool.query(
            `DELETE FROM users WHERE id = ?`,[id] )
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json({ message: 'User deleted successfully' });
                
            }
    catch (err) {
         res.status(500).json({ error: err.message });
    }
}       
