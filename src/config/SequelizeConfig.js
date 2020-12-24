// Entities
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Sequelize configs
const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres'
    }
)

module.exports = sequelize;