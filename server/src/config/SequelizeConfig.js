// This file is generated with the sequelize init command but then it was modified to be a JS file
require('dotenv').config();

// Entities
const { Sequelize } = require('sequelize');

// Main configs
const type = process.env.NODE_ENV || 'development';
const environment = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'west-quotes',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'west-quotes',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'west-quotes',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
};

// Sequelize instance
const sequelize = new Sequelize(
  environment[type].database,
  environment[type].username,
  environment[type].password,
  {
    host: environment[type].host,
    dialect: environment[type].dialect,
  },
);

module.exports = { ...environment, sequelize };
