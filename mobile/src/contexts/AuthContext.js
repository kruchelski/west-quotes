// Basic imports
import React, { createContext, useState, useEffect, useContext } from 'react';

// Configs imports
import { setDefaultHeaders, removeDefaultHeader } from '../config/RequestConfig';

// Services imports
import * as auth from '../services/AuthService';
import * as tokenService from '../services/TokenService';
import * as httpService from '../services/HttpService';

// Basic object provided to the AuthContext
let authContextObject = {
	signed: false,			// User is logged
	signIn: null,				// SignIn Function
	signUp: null,				// SignUp Function
	signOut: null,			// SignOut Function
	loading: false,			// App is loading (retrieving possible refresh token stored)
	error: {
		state: false,
		msg: ''
	},
	user: {							// User
		uuid: '',
		username: '',
		email: '',
	}
}

/**
 * AuthContext main object
 */
export const AuthContext = createContext(authContextObject);

/**
 * Provider for the components
 * @param {*} param0 Components inside AuthContext.Provider
 */
export const AuthProvider = ({ children }) => {

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState(authContextObject.error);

	useEffect(() => {

		// Function to load stored data 
		const loadStorageData = async () => {
			try {
				// Retrieves the user and the refreshToken from the localStorage
				const storageUser = await tokenService.getUser();
				const storageRefreshToken = await tokenService.getRefreshToken();

				if (!storageRefreshToken) {
					// If there isn't a token, set the user as null;

					console.log('No token stored');
					if (usert !== null) {
						console.log('Usert not null')
						setUser(null);
					}

				} else {

					console.log('Tyring to get refresh token data')

					// In case there's a refresh token stored, tries to get a net access token
					const response = await httpService.tokenRenewal(null, false, false);

					console.log('Response from token renewal');
					console.log(response.data);

					// Checks the content of response
					if (response?.data?.accessToken) {
						// // It there's a new token, set as default in the request header
						// server.defaults.headers['Authorization'] = response.accessToken

						// Sets the user
						if (response?.data?.user) {
							// Tries to get the user returned from the back end
							setUser(response.data.user);

							// Updates the storage with the user
							await tokenService.setUser(response.data.user);

						} else if (storageUser) {
							// If no user returned from the back end, tries to get the user from the async storage
							setUser(JSON.parse(storageUser));
						} else {
							// If no user is found, set an error state
							setErrorState({ state: true, msg: 'No user stored or in the database' });
							if (user !== null) {
								console.log('User is not null 2')
								setUser(null);
							}
						}
					} else {
						// If the backend does not return an access Token, set an error state
						if (user !== null) {
							console.log('User is not null 3')
							setUser(null);
						}
						setErrorState({ state: true, msg: 'No access token provided from the server' });
					}
				}
			} catch (err) {
				// In case any error happens
				console.log('[AuthContext - loadStorageData] ERROR!'); // TODO: temp
				// console.log(err)																			 // TODO: temp
				setUser(null);
				setErrorState({ state: true, msg: err.error || err.message || 'An unexpected error happened' })
			} finally {
				setLoading(false);
			}
		}

		// Calls the function to get the info from user
		loadStorageData();
	},[])

	/**
	 * Sign In an user in the application
	 * @param {*} email Email of the user
	 * @param {*} password Password
	 */
	const signIn = async (email, password) => {
		try {
			// Show loader
			setLoading(true);


			let tempBody = {
				email: 'nhoca@teste.com',
				password: 'plup'
			}

			// Makes request to login
			const response = await httpService.makeRequest('signIn', tempBody, null, false);
			console.log('resposta do signIn');
			console.log(response.data);

			// If the response is missing some data then set as error
			if (!response || !response.data || !response.data.user || !response.data.accessToken || !response.data.refreshToken) {
				console.log('AHHHH');
				setUser(null);
				setErrorState({ state: true, msg: 'Missing authentication data from the server' })

			} else {
				console.log('funcionaaaoanoanao')
				// Saves the user and the refresh token in the async storage
				await tokenService.setUser(response.data.user);
				await tokenService.setRefreshToken(response.data.refreshToken);

				// Sets the default header
				setDefaultHeaders('Authorization', response.data.accessToken);

				// Sets the user
				setUser(response.data.user);
			}

		} catch (err) {
			// In case any error happens
			console.log('[AuthContext - signIn] ERROR!'); // TODO: temp
			console.log(err.message)																			 // TODO: temp
			setUser(null);
			setErrorState({ state: true, msg: err.error || err.message || 'An unexpected error happened in the signIn' })
		} finally {
			setLoading(false);
		}
	}

	/**
	 * Register a new user into the system
	 * @param {*} username User's username
	 * @param {*} email User's email
	 * @param {*} password User's password
	 */
	const signUp = async (username, email, password) => {
		try {
			// Show loader
			setLoading(true);

			let tempBody = {
				username: 'nilce',
				email: 'nilce@teste.com',
				password: 'nilce'
			}

			// Makes the request to register an user
			const response = await httpService.makeRequest('signUp', tempBody, null, false);
			console.log('response do signUp');
			console.log(response.data);

			// If there's missing data in the response set user as null and se an error
			if (!response || !response.data || !response.data.uuid) {
				setUser(null);
				setErrorState({ state: true, msg: 'Missing register data from the server' })

			} else {

				// Calls the signIn function
				await signIn(email, password);
			}
		} catch (err) {

			// In case any error happens
			console.log('[AuthContext - signUp] ERROR!'); // TODO: temp
			console.log(err.message)																			 // TODO: temp
			setUser(null);
			setErrorState({ state: true, msg: err.error || err.message || 'An unexpected error happened in the signUp' })
		} finally {

			// Hide loader
			setLoading(false);
		}
	}

	/**
	 * SignOut an user of the application
	 */
	const signOut = async () => {
		try {
			
			// Show loader
			setLoading(true);

			console.log('user before make request to signout');
			console.log(user);

			// Makes request to logout user
			await httpService.makeRequest('signOut', false, user.uuid, false);
			console.log('After make request to signout');

			// Clear the storage
			await tokenService.clearStorage();

			// Remove default Authorization header
			removeDefaultHeader('Authorization');

			// Sets the user as null
			setUser(null);

		} catch (err) {

				// In case any error happens
				console.log('[AuthContext - signOut] ERROR!'); // TODO: temp
				console.log(err.message)																			 // TODO: temp
				setUser(null);
				setErrorState({ state: true, msg: err.error || err.message || 'An unexpected error happened in the signIn' })
		
		} finally {

			// Hide loader
			setLoading(false);
		}
		await tokenService.clearStorage();
		setUser(null);
	}

	// Updates the authContextObject
	authContextObject.signIn = signIn;
	authContextObject.signOut = signOut;

	return (
		<AuthContext.Provider value={{
			signed: !!user,
			user,
			signIn,
			signUp,
			signOut,
			loading,
			error: errorState
		}}>
			{ children }
		</AuthContext.Provider>
	)
}

/**
 * Returns the AuthContext for usage
 */
export const useAuth = () => {
	const context = useContext(AuthContext);
	return context;
}