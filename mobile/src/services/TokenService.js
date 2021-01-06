// Basic imports
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Retrieve the refreshToken from the async storage
 */
export const getRefreshToken = async () => {
	try {
		return await AsyncStorage.getItem('refreshToken');
	} catch (err) {
		console.log(err);
		return null;
	}
}

/**
 * Stores a refresh token
 * @param {*} refreshToken Refresh token (JWT)
 */
export const setRefreshToken = async (refreshToken) => {
	await AsyncStorage.setItem('refreshToken', refreshToken)
}

/**
 * Retrieve the accessToken from the async storage
 */
export const getAccessToken = async () => {
	try {
		return await AsyncStorage.getItem('accessToken');
	} catch {
		console.log(err);
		return null;
	}
}

/**
 * Stores an access token
 * @param {*} accessToken Access Token (JWT)
 */
export const setAccessToken = async (accessToken) => {
	await AsyncStorage.setItem('accessToken', accessToken);
}

/**
 * Retrieve the user info from the async storage
 */
export const getUser = () => {
	try {
		let user =  await AsyncStorage.getItem('user');
		if (!user) {
			throw new Error('No user in the async storage');
		}
		return JSON.parse(user);
	} catch {
		console.log(err);
		return null;
	}
}

/**
 * Stores an user
 * @param {*} user User ({username: string, email: string}) 
 */
export const setUser = (user) => {
	await AsyncStorage.setItem('user', user);
}