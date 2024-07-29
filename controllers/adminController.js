import pool from '../config/db.js'


export const getAllUser = async (req,res)=>{
    
    try{
        const [users] = await pool.query('SELECT * FROM users ');
        res.json(users);

    }catch(err){
        res.status(500).json({message:"Failed to fetch user "})
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const [products] = await pool.query('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error });
    }
};
 export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
};
export const getAllOrders = async (req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error });
    }
};

export const deleteOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        await pool.query('DELETE FROM orders WHERE orderId = ?', [orderId]);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order', error });
    }
};