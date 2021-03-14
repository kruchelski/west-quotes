// Entidades
require('dotenv').config();
const express = require('express');
const expressSession = require('express-session');

// Constants
const sessionSecret = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 3005;

// Inicialização
const app = express();
app.use(express.json());
app.use(expressSession({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
}));

module.exports = { app, PORT };
