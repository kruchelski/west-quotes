export const ENDPOINTS = {

	/**
	 * Requests to MAIN routes (/)
	 */

	// Get a quote and image
	getQuote: {
		url: '/',
		type: 'get',
		body: false,
		params: false,
		headers: null,
	},

	/**
	 * Requests to USER routes (/user)
	 */

	// Register a new user
	signUp: {
		url: '/user/register',
		type: 'post',
		body: true,
		params: false,
		headers: {
			'Content-Type' : 'application/json',
		}
	},

	// Login an existing user
	signIn: {
		url: '/user/login',
		type: 'post',
		body: true,
		params: false,
		headers: {
			'Content-Type' : 'application/json'
		}
	},

	// Logout an user
	signOut: {
		url: '/user/logout',
		type: 'delete',
		body: false,
		params: true,
		headers: null,
	},

	// Refresh the access token
	tokenRenewal: {
		url: '/user/token',
		type: 'post',
		body: true,
		params: false,
		headers: {
			'Content-Type' : 'application/json'
		},
	},

	// Delete the logged user
	deleteUser: {
		url: '/user',
		type: 'delete',
		body: false,
		params: false,
		headers: null,
	},

	/**
	 * Requests to QUOTE routes (/quote)
	 */

	// Gets a list of the quotes that the user liked
	getAllQuotes: {
		url: '/quote',
		type: 'get',
		body: false,
		params: false,
		headers: null,
	},

	// Gets details of specific quote
	getQuoteDetails: {
		url: '/quote',
		type: 'get',
		body: false,
		params: true,
		headers: null,
	},

	// Like a quote
	likeQuote: {
		url: '/quote',
		type: 'put',
		body: false,
		params: true,
		headers: null,
	},

	// Dislike a quote
	dislikeQuote: {
		url: '/quote',
		type: 'delete',
		body: false,
		params: true,
		headers: null
	}

}