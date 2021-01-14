// Imports
import * as tokenService from './TokenService';
import { server } from '../config/RequestConfig';
import { ENDPOINTS } from '../constants/Requests';

// Configs imports
import { setDefaultHeaders } from '../config/RequestConfig';

export const makeRequest = async (endpoint, requestBody = null, params = null, retry = null) => {

	try {

		console.log('endpoint que ta chamando');
		console.log(endpoint);

		// Retrieves the information about the request
		const requestInfo = ENDPOINTS[endpoint];


		// Gets the client for the request
		const client = _getRequestFunction[requestInfo.type];

		// Gets the URL
		let url = requestInfo.url;

		// If there's params, add to the url
		if (requestInfo.params) {
			url = `${url}/${params}`;
		}

		// Sets custom headers
		let headers = null;
		if (requestInfo.headers) {
			headers = requestInfo.headers;
		}

		// Sets body
		let body = null;
		if (requestInfo.body) {
			body = requestBody;
		}

		// Makes the request
		return await client( url, body, headers);
	} catch (err) {
		console.log(`[RequestService - ${endpoint}] ERROR!`); // TODO: temp
		// console.log(err.response);
		console.log(typeof err.response.status);
		if (err.response.status === 403 && retry) {
			console.log('Token Invalid, trying new request')
			return await tokenRenewal(endpoint, requestBody, params);
		} else {
			throw new Error(`[${err.response.status}] ${err.response.data}`);
		}


		// Verificar o erro de token e ver se tem retry pra tentar buscar um novo token
	}

}

/**
 * Gets a new access token from the server
 * @param {*} callback A http request to call after getting the token (optional)
 * @param {*} body The body params of the http request (optional)
 * @param {*} params THe params of the http request (optional)
 */
export const tokenRenewal = async (callback = null, body = null, params = null) => {
	// Retrieves the refreshToken from the storage
	const refreshToken = await tokenService.getRefreshToken();
	console.log('Is there a refresh Token??');
	console.log(refreshToken);

	// If there's no refresh token, return null
	if (!refreshToken) {
		return null;
	}

	// If there's a token, try to refresh
	try {
		const requestInfo = ENDPOINTS['tokenRenewal'];
		const client = _getRequestFunction[requestInfo.type];
		const response = await client(requestInfo.url, { token: refreshToken });
		console.log('Response do token renewal');
		console.log(response.data)

		if (!response || !response.data || !response.data.accessToken) {
			return null;
		}

		// Set the new access token as the default Authorization
		setDefaultHeaders('Authorization', response.data.accessToken);

		// If it there's a callback, call it back
		if (callback) {
			return await makeRequest(callback, body, params, false);
		} else {
			return response;
		}
	} catch (err) {
		console.log(`[RequestService - tokenRenewal] ERROR!`); // TODO: temp
		console.log(err)
		throw new Error(`[${err.response.status}] ${err.response.data}`);
	}
}

/**
 * Return a axios function according to the type of the request
 */
const _getRequestFunction = {
	get: server.get,
	post: server.post,
	put: server.put,
	delete: server.delete
}