// Basic imports
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Retrieve the refreshToken from the async storage
 */
export const getRefreshToken = async () => {
	try {
		return await AsyncStorage.getItem('@west-quotes:refreshToken');
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
	await AsyncStorage.setItem('@west-quotes:refreshToken', refreshToken)
}

/**
 * Retrieve the user info from the async storage
 */
export const getUser = async () => {
	try {
		let user =  await AsyncStorage.getItem('@west-quotes:user');
		if (!user) {
			throw new Error('No user in the async storage');
		}
		return JSON.parse(user);
	} catch (err) {
		console.log(err.message);
		return null;
	}
}

/**
 * Stores an user
 * @param {*} user User ({ uuid: string, username: string, email: string }) 
 */
export const setUser = async (user) => {
	await AsyncStorage.setItem('@west-quotes:user', JSON.stringify(user));
}

/**
 * Clears the storage
 */
export const clearStorage = async () => {
	await AsyncStorage.clear();
}