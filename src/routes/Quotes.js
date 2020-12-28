// Libraries
const express = require('express');
const router = express.Router();

// Entities
const QuotesController = require('../controllers/QuotesController');

// Middlewares
const { authenticate } = require('../middlewares/AuthMiddlewares');

router.get('/', (req, res) => {
    res.status(200).send('OK from Quotes Router')
})

/**
 * Route to like a quote passed by UUID in the body's request
 */
router.post('/like', authenticate, async (req, res) => QuotesController.likeQuote(req, res));

module.exports = router;