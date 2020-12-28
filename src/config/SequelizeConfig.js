// This file is generated with the sequelize init command but then it was modified to be a JS file
require('dotenv').config();

// Entities
const { Sequelize } = require('sequelize');

// Main configs
const env = process.env.NODE_ENV || 'development';

development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'west-quotes',
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres'
};

test = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'west-quotes',
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres'
};

production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'west-quotes',
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres'
}

this.development = development;
this.test = test;
this.production = production;


// Sequelize instance
const sequelize = new Sequelize(
  this[env].database,
  this[env].username,
  this[env].password,
  {
    host: this[env].host,
    dialect: this[env].dialect
  }
)

module.exports = { development, test, production, sequelize }