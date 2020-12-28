// Libraries
const express = require('express');
const router = express.Router();

// Entities
const QuotesController = require('../controllers/QuotesController');

// Middlewares
const { authenticate } = require('../middlewares/AuthMiddlewares');

/**
 * Route to get every liked quote from the user
 */
router.get('/', authenticate, async (req, res) => QuotesController.index(req, res))

/**
 * Route to get the details of a specific quote
 */
router.get('/:uuid', authenticate, async (req, res) => QuotesController.getQuoteDetails(req, res))

/**
 * Route to like a quote passed by UUID in the body's request
 */
router.put('/:uuid', authenticate, async (req, res) => QuotesController.likeQuote(req, res));

/**
 * Route to remove a liked quote
 */
router.delete('/:uuid', authenticate, async (req, res) => QuotesController.removeQuote(req, res));


module.exports = router;