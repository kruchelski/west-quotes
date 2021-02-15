import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

export const setItemInStorage = async (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  await AsyncStorage.setItem(key, value);
}

export const getItemFromStorage = async (key) => {
  if (!typeof key === 'string') {
    return null;
  }
  return await AsyncStorage.getItem(key);
}

export const removeItemFromStorage = async (key) => {
  await AsyncStorage.removeItem(key);
}

export const clearStorage = async () => {
	let promises = [];
  for (const key in STORAGE_KEYS) {
    promises.push(AsyncStorage.removeItem(STORAGE_KEYS[key]));
  }

  await Promise.all(promises);
}