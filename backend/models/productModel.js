const pool = require('../config/db');

const getAllProducts = async () => {
    const result = await pool.query('SELECT * from products');
    return result.rows;
};

const getProductById = async (id) => {
    const result = await pool.query('SELECT * from products WHERE id = $1', [id]);
    return result.rows[0];
};

const getProductsByCategory = async (category) => {
    const result = await pool.query('SELECT * from products WHERE category = $1', [category]);
    return result.rows;
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
  };