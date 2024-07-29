import pool from '../config/db.js'

export const order = async (req, res) => {
    try {
        const { userId, productId, quantity , status  } = req.body;
        const [product] = await pool.query('SELECT price FROM products WHERE id = ?', [productId]);
        if (product.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const productPrice = product[0].price; 
        const totalPrice = quantity * productPrice;
        const [result] = await pool.query('INSERT INTO orders (userId, productId, quantity, totalPrice, status) VALUES (?, ?, ?, ?, ?)', 
            [userId, productId, quantity, totalPrice, status]
        );
        res.status(201).json({ orderId: result.insertId });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Failed to create order' });
    }
}


// order tracking 
export const orderTrackingById = async (req, res) => {
    const { orderId } = req.params;
    try {
        console.log(`Fetching order with ID: ${orderId}`);
        
        const [rows] = await pool.query('SELECT * FROM orders WHERE orderId = ?', [orderId]);
        
        console.log(`Query Result: `, rows);

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Order Not Found' });
        }
    } catch (err) {
        console.error(err); // Log the error to the server console
        res.status(500).json({ error: 'Failed to retrieve order' });
    }
}
// updating the status of the order 
export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;
    try {
        const [result] = await pool.query('UPDATE orders SET status = ? WHERE orderId = ?', [status, orderId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found or no changes made' });
        }
        res.status(200).json({ message: 'Order status updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
}

