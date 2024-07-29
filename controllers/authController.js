import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

// Register user
export  async function registerUser(req, res) {
  const { email, username, password_hash, role } = req.body;
  if (!username || !password_hash || !role || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)', 
      [username, email, hashedPassword, role]
    );

    res.status(201).json({ id: result.insertId, username, email, role });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
// login user 
export  async function loginUser(req,res){
  const {email, password} = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try{
       const [row] = await pool.query(
        `
        SELECT * FROM users WHERE email = ? 
        `,[email])
        if(row.length === 0){
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = row[0];
        console.log("user",user)
        const passwordMatch =await bcrypt.compare(password , user.password_hash);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({id:user.id, role:user.role},process.env.JWT_KEY,{});
        res.json({token})
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }

}
