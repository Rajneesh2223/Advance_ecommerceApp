import pool from '../config/db.js';

export const createVendorHandler = async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO vendors (name, email, phone, address) VALUES (?, ?, ?, ?)',
            [name, email, phone, address]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating vendor' });
    }
};

export const getVendorsHandler = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vendors');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching vendors' });
    }
};

export const getVendorByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM vendors WHERE id = ?', [id]);
        const vendor = rows[0];
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }
        res.json(vendor);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching vendor' });
    }
};

export const updateVendorHandler = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    try {
        await pool.query(
            'UPDATE vendors SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
            [name, email, phone, address, id]
        );
        res.json({ message: 'Vendor updated' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating vendor' });
    }
};

export const deleteVendorHandler = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM vendors WHERE id = ?', [id]);
        res.json({ message: 'Vendor deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting vendor' });
    }
};
