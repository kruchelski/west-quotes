import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

export const setItemInStorage = async (key, value) => {
  if (typeof value === 'object') {
    // eslint-disable-next-line no-param-reassign
    value = JSON.stringify(value);
  }
  await AsyncStorage.setItem(key, value);
};

export const getItemFromStorage = (key) => {
  if (typeof key !== 'string') {
    return Promise.resolve(null);
  }

  return AsyncStorage.getItem(key);
};

export const removeItemFromStorage = async (key) => {
  await AsyncStorage.removeItem(key);
};

export const clearStorage = async () => {
  await Promise.all(
    Object.keys(STORAGE_KEYS).map((key) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      AsyncStorage.removeItem(STORAGE_KEYS[key])),
  );
};
