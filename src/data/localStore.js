import AsyncStorage from '@react-native-community/async-storage';

export const setItem = (key, value) => {
  AsyncStorage.setItem(key, value);
};

export const getItem = key => AsyncStorage.getItem(key);

export const clearStorage = () => AsyncStorage.clear();

export default {
  setItem,
  getItem,
  clearStorage,
};
