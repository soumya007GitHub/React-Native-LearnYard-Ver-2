import AsyncStorage from '@react-native-async-storage/async-storage';

//  Here the value is passed as argument from other components/screens

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(value));
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userData');
    if (value !== null) {
        return JSON.parse(value);
      console.log('Retrieved value:', value);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error('Error removing data:', error);
  }
};

export default{
    storeData,
    retrieveData,
    removeData
}