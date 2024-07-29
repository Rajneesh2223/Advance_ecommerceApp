import pool from '../config/db.js';

export const createProduct = async (req, res) => {
  const { name, description, price, stock, image_url, category_id } = req.body;

  if (!name || !description || !price || !stock || !image_url || !category_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [result] = await pool.query(
      `
      INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES (?, ?, ?, ?, ?, ?)
      `, [name, description, price, stock, image_url, category_id]
    );

    res.status(201).json({ id: result.insertId, name, description, price, stock, image_url, category_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// get all products 
export const getAllProducts = async ( req, res )=>{
      try{
        const [result]= await pool.query(`
          SELECT products.* , categories.name AS categories_name, categories.description AS category_description 
          FROM products 
          JOIN categories ON products.category_id = categories.id
          `)
        res.status(200).json(result)
      }
      catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}

// get all products by id 
export const getProductById = async (req, res) =>{
     const {id} = req.params;
     try{
      const [result] = await pool.query(
          `
             SELECT products.*, categories.name as category_name, categories.description as category_description
              FROM products
              JOIN categories ON products.category_id = categories.id
              WHERE products.id = ?
          ` , [id]
        )
        res.json({result});

     }catch(err){
      console.error(err);
      res.status(500).json({ message: 'Server error' });

     }
}

// update the products by id 
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, image_url, category_id } = req.body;

  if (!name || !description || !price || !stock || !image_url || !category_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [categoryRows] = await pool.query('SELECT * FROM categories WHERE id = ?', [category_id]);

    if (categoryRows.length === 0) {
      return res.status(400).json({ message: 'Invalid category_id' });
    }
    const [result] = await pool.query(
      `UPDATE products
       SET name = ?, description = ?, price = ?, stock = ?, image_url = ?, category_id = ?
       WHERE id = ?`,
      [name, description, price, stock, image_url, category_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// delete the products by id 
export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM products WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `The product with ID ${id} was not found or could not be deleted.` });
    }

    res.json({ message: 'The product  ${id} was deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};