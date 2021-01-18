// Libraries
const express = require('express');
const router = express.Router();

// Entities
const AuthController = require('../controllers/AuthController');
const TokenController = require('../controllers/TokenController');

// Middlewares
const { authenticate } = require('../middlewares/AuthMiddlewares');

/**
 * Register a new user in the application
 */
router.post('/register', async (req, res) => AuthController.insertUser(req, res));

/**
 * Login an user into the system
 */
router.post('/login', async (req, res) => AuthController.authenticateUser(req, res));

/**
 * Request new access token
 */
router.post('/token', async (req, res) => TokenController.tokenRenewal(req, res));

/**
 * Logout an user from the system
 */
router.delete('/logout/:uuid', async (req, res) => AuthController.logoutUser(req, res));

/**
 * Delete an user's account
 */
router.delete('/', authenticate, async (req, res) => AuthController.removeUser(req, res));

/**
 * Edit an user's account
 */
router.put('/', authenticate, async (req, res) => AuthController.editUser(req, res));

module.exports = router;