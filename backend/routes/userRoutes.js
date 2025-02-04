const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a user
 *     description: Registers a new user.
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post('/register', userController.registerUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves all users.
 *     responses:
 *       200:
 *         description: List of users
 */

router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a specific user by ID.
 *     responses:
 *       200:
 *         description: User details retrieved
 */

router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information
 *     description: Updates details of a specific user.
 *     responses:
 *       200:
 *         description: User updated successfully
 */

router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a specific user.
 *     responses:
 *       200:
 *         description: User deleted successfully
 */

router.delete('/:id', userController.deleteUser);

module.exports = router;
