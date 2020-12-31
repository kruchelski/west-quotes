/**
 * This file is being userd only for tests at this point. Soon it will be deleted
 */


// Entidades
// const express = require('express');
// const expressSession = require('express-session');
const Passport = require('passport');
const PassportTwitter = require('passport-twitter');
require('dotenv').config();
const Twitter = require('twitter');
const axios = require('axios');

const { app, PORT } = require('./src/configs/MainConfig');

// Constants
const apiKey = process.env.TWITTER_API_KEY;
const apiSecret = process.env.TWITTER_API_KEY_SECRET;
const callbackUrl = process.env.CALLBACK_URL;
// const sessionSecret = process.env.SESSION_SECRET;

// Configs
// const app = express();
// app.use(express.json());
// app.use(expressSession({
// 	secret: sessionSecret,
// 	resave: false,
// 	saveUninitialized: true
// }))

var Client;

Passport.use(new PassportTwitter.Strategy(
	{
		consumerKey: apiKey,
		consumerSecret: apiSecret,
		callbackURL: callbackUrl
	},
	(token, tokenSecret, profile, cb) => {
		console.log('token');
		console.log(token);
		console.log('tokenSecret');
		console.log(tokenSecret);
		Client = new Twitter({
			consumer_key: apiKey,
			consumer_secret: apiSecret,
			access_token_key: token,
			access_token_secret: tokenSecret
		})
		return cb(null, profile);
	}
))


Passport.serializeUser((user, cb) => {
	cb(null, user);
})

Passport.deserializeUser((obj, cb) => {
	cb(null, obj);
})

app.use(Passport.initialize());
app.use(Passport.session());

app.listen(PORT, () => {
});
console.log(`App listening to port: ${PORT}`);



app.get('/', (req, res) => {
	return res.json({
		apiKey,
		apiSecret,
		user: req.user ? req.user.username : 'nada aqui',
	})
})

app.get('/auth/twitter', Passport.authenticate('twitter'));

app.get(
	'/auth/twitter/callback',
	Passport.authenticate('twitter', { failureRedirect: '/' }),
	(req, res) => {
		res.redirect('/');
	}
)

app.get('/kanye', async (req, res) => {
	try {
		const quote = await axios.get('https://api.kanye.rest');
		console.log('Kanye');
		console.log(quote);
		res.json(quote.data.quote);

	} catch (err) {
		res.status(500).send(`Ocorreu um erro: ${err.message}`);
	}
})

app.get('/postar', async (req, res) => {
	if (!Client) {
		res.status(403).send('Tem que autenticar primeiro');
		return;
	}
	try {
		// Recuperar uma quote do kanye
		let quote = await axios.get('https://api.kanye.rest');
		quote = quote.data.quote;

		let status = `[west quotes] TEST - ${quote}`;
		if (status.length >= 210) {
			status = status.substring(0, 210);
		}

		Client.post(
			'statuses/update',
			{ status },
			(error, tweet, response) => {
				console.log('Uepa');
				console.log(tweet);
				if (error) {
					console.log('Ocorreu um erro ao twittar');
					console.log(error);
					res.status(500).send('Ocorreu um erro ao twittar.');
					return
				}
				res.status(200).send(`Deu certo. ${tweet.text}`);

			}
		)
	} catch (err) {
		res.status(500).send(`Ocorreu um erro. Erro: ${err.message}`);
	}

})