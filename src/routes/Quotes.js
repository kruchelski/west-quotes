// Entities
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('OK from Quotes Router')
})

module.exports = router;