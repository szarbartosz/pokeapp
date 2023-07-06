import AsyncStorage from '@react-native-async-storage/async-storage';
import {Pokemon} from '../App';

export const storeData = async (key: string, value: Pokemon) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('encountered error when saving data to async storage', e);
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('encountered error when getting data from async storage', e);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('encountered error when removing data from async storage', e);
  }
};
