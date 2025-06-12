import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useContext, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../Context/AuthContext';
import Services from '../Shared/Services';

GoogleSignin.configure({
  webClientId: '',
  // Add yours
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: false,
  iosClientId: '',
  // Add yours
});

export default function LoginScreen() {
  // below useState hook is defined in App.js
  const {setUserData} = useContext(AuthContext);


  const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (response && response.data?.idToken) {
      const { user } = response.data;
      // below to set data for whole app to access user details
      setUserData(user);
      // below is for async storage
      await Services.storeData(user);
      console.log('✅ Login Successful');
      console.log('User:', user);
    } else {
      console.log('⚠️ Login failed or was cancelled.');
    }
  } catch (error) {
    console.log('❌ Google Sign-In Error');
    console.log('Code:', error.code);
    console.log('Message:', error.message);
  }
};

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Image
          style={styles.image}
          source={require('../assets/Images/loginScreen.jpg')}
        />
      </View>

      <View style={styles.belowContainer}>
        <View>
          <Text style={{ fontSize: 15, fontFamily: 'monospace', letterSpacing: -1, textAlign: 'center', marginBottom: 10 }}>
            Start exploring your coding journey with
          </Text>
          <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 24, fontFamily: 'monospace', color: 'purple', fontWeight: '900' }}>LearnYard</Text>
            <Entypo name="code" size={30} color="black" />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={googleSignIn}>
          <FontAwesome name="google" size={20} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', fontFamily: 'monospace' }}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1, paddingBottom: Dimensions.get('screen').height * 0.06 }}>
        <Text style={{ fontSize: 15, color: 'gray' }}>Made with <Entypo name="heart" size={15} color="red" /> by Soumya</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dc8c95'
  },
  image: {
    width: 'auto',
    height: Dimensions.get('screen').height * 0.48,
    resizeMode: 'cover',
  },
  belowContainer: {
    marginTop: Dimensions.get('screen').height * -0.03,
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: Dimensions.get('screen').width * 0.7
  }
});
