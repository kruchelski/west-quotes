// Entities
const express = require('express');
const router = express.Router();
const sequelize = require('../config/SequelizeConfig');

router.get('/', async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Parece que a conexão deu boa')
    } catch(err) {
        console.log('Parece que a conexão não deu boa')
        console.log(err);
    }
    res.status(200).send('OK from Login Router')
})

module.exports = router;