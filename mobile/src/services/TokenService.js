// Basic imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'jsonwebtoken';

// TODO colocar isso em um .env
const ACCESS_TOKEN_SECRET = 'pipinha';

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
 * Retrieve the user info from the async storage
 */
export const getUserInfo = () => {
	try {
		jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, user) => {
			if (err) {
				throw new Error('Invalid Token');
			}
			return user;
		})
	} catch (err) {
		console.log(err);
		return null;
	}
}