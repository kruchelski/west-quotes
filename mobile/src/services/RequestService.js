// Imports
import * as tokenService from './TokenService';
import { server } from '../config/RequestConfig';
import { ENDPOINTS } from '../constants/Requests';

// Configs imports
import { setDefaultHeaders } from '../config/RequestConfig';

export const makeRequest = async (endpoint, body = null, params = null, retry = null) => {

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

	// If there's no refresh token, return null
	if (!refreshToken) {
		return null;
	}

	// If there's a token, try to refresh
	try {
		let { url, type, body } = ENDPOINTS['tokenRenewal'];
		const client = _getRequestFunction[type];
		body.token = refreshToken;
		const response = await client(url, { token: body.token })

		if (!response || response.accessToken) {
			return null;
		}

		// Set the new access token as the default Authorization
		setDefaultHeaders('Authorization', response.accessToken);

		// If it there's a callback, call it back
		if (callback) {
			return await makeRequest(callback, body, params, false);
		} else {
			return newToken
		}
	} catch (err) {

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