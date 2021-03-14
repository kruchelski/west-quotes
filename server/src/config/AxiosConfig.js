// Entities
require('dotenv').config();
const axios = require('axios');

// Initialization

/**
 * Kanye REST API instance
 */
const kanye = axios.create({
  baseURL: 'https://api.kanye.rest/',
});

/**
 * Unsplash API Instance
 */
const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com/',
  params: {
    page: 1,
    client_id: process.env.UNSPLASH_API_KEY,
    per_page: 30,
  },
});

module.exports = { kanye, unsplash };
