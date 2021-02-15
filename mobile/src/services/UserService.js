import { storageService } from './index';
import { STORAGE_KEYS } from '../constants';

export const getRefreshTokenFromStorage = async () => {
	try {
		return await storageService.getItemFromStorage(STORAGE_KEYS.REFRESH_TOKEN);
	} catch (err) {
		console.log(err);
		return null;
	}
}

export const setRefreshTokenInStorage = async (refreshToken) => {
  await storageService.setItemInStorage(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
}

export const getUserFromStorage = async () => {
	try {
		let user =  await storageService.getItemFromStorage(STORAGE_KEYS.USER);
		if (!user) {
			throw new Error('No user in the async storage');
		}
		return JSON.parse(user);
	} catch (err) {
		console.log(err.message);
		return null;
	}
}

export const setUserInStorage = async (user) => {
  await storageService.setItemInStorage(STORAGE_KEYS.USER, user);
}