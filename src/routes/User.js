// Entities
const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/', async (req, res) => {

    try {
        const users = await User.findAll({raw:true});
        console.log(users);
        console.log('Parece que a conexão deu boa')
        res.json(users);
    } catch(err) {
        console.log('Parece que a conexão não deu boa')
        console.log(err);
        res.status(500).send('deu problema')
    }
    
})

module.exports = router;