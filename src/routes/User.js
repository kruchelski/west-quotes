// Libraries
const express = require('express');
const router = express.Router();

// Entities
const { User, Quote, RefreshToken } = require('../models');
const AuthController = require('../controllers/AuthController');
const TokenController = require('../controllers/TokenController');



router.get('/', async (req, res) => {

    try {
        const users = await User.findAll({include: [Quote, RefreshToken]});
        console.log('===============================')
        console.log(users);
        console.log('===============================')

        // console.log(parsedUserts[0].Quotes);
        console.log('Parece que a conexão deu boa')
        res.json(users);
        // res.json(parsedUserts);
    } catch(err) {
        console.log('Parece que a conexão não deu boa')
        console.log(err);
        res.status(500).send('deu problema')
    }
    
})

/**
 * Route to register a new user to the application
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

module.exports = router;