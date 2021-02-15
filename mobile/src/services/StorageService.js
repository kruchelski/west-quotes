import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const clearStorage = async () => {
	await AsyncStorage.clear();
}