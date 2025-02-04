const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const pool = require('../config/db');


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //Verifies if user exists
        const existingUser = await User.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        //Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //Create new user
        const newUser = await User.createUser(username, email, hashedPassword);

        res.status(201).json({
            message: 'User registered Succesfully',
            user: { id: newUser.id, username: newUser.username, email: newUser.email}
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    };
};

//GET all users
const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, email, created_at FROM users');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

//GET user by id
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.messsage });
    }
};

//UPDATE users
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const result = await pool.query(
            'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING username, email, id ',
            [username, email, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

//DELETE users
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

module.exports = {
    registerUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};