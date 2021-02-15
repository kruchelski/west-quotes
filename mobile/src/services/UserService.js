import * as StorageService from './StorageService';
import { STORAGE_KEYS } from '../constants';

export const getRefreshTokenFromStorage = async () => {
	try {
		return await StorageService.getItemFromStorage(STORAGE_KEYS.REFRESH_TOKEN);
	} catch (err) {
		return null;
	}
}

export const setRefreshTokenInStorage = async (refreshToken) => {
  await StorageService.setItemInStorage(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
}

export const getUserFromStorage = async () => {
	try {
		let user =  await StorageService.getItemFromStorage(STORAGE_KEYS.USER);
		if (!user) {
			throw new Error('No user in the async storage');
		}
		return JSON.parse(user);
	} catch (err) {
		return null;
	}
}

export const setUserInStorage = async (user) => {
  await StorageService.setItemInStorage(STORAGE_KEYS.USER, user);
}