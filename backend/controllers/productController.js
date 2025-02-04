const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: 'Products search error', error}) 
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not find' });
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: 'Product search error', error})
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        if (!category) {
            return res.status(400).json({message: 'Category not specified'});
        }
        const products = await Product.getProductsByCategory(category);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Product search error', error });
      }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
  };