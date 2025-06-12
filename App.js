import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import { AuthContext } from './Context/AuthContext';
import HomeScreen from './Screens/HomeScreen';
import { useEffect, useState } from 'react';
import Services from './Shared/Services';
import { StatusBar } from 'expo-status-bar';
import CourseDetails from './Screens/CourseDetails';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChapterScreen from './Screens/ChapterScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    Services.retrieveData().then(value => {
      if (value) {
        setUserData(value);
      }
      else {
        setUserData(null);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
    <StatusBar style="dark" />
    {userData ? (
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
          headerShown: true
        }}/>
            <Stack.Screen name="CourseDetailsScreen" component={CourseDetails} options={{
          title : ''
        }}/>
        <Stack.Screen name="ChapterScreen" component={ChapterScreen} options={{
          title : ''
        }}/>
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    ) : (
      <LoginScreen />
    )}
  </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
