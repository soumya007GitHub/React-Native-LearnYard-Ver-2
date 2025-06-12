import { View, ScrollView, Text, Button, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { AuthContext } from '../Context/AuthContext';
import SearchBar from '../components/SearchBar';
import Slider from '../components/Slider';
import VideoCourseList from '../components/VideoCourseList';
import CourseList from '../components/CourseList';

export default function HomeScreen({ navigation }) {
  const { userData, setUserData } = useContext(AuthContext);

  // const googleSignOut = async () => {
  //   try {
  //     await GoogleSignin.signOut();
  //     setUserData(null);
  //     Services.removeData();
  //     console.log('🚪 Successfully logged out.');
  //   } catch (error) {
  //     console.error('Logout Error:', error);
  //   }
  // };
useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
            backgroundColor: '#4da8da',
          },
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 12, color: '#fff' }}>Welcome,</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>{userData.name}</Text>
        </View>
      ),
      headerRight: () => (
        <Image
          source={{ uri: userData.photo }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 50,
            marginRight: 10,
          }}
        />
      ),
    });
  }, [navigation, userData]);
  return (
    <ScrollView style={styles.container}>
      {/* <Header /> */}
      <SearchBar />
      <Slider />
      <VideoCourseList />
      {/* Course of all basic types */}
      <CourseList isBasic={true} title={"Basic Courses"}/>
      {/* Course of all not basic types */}
      <CourseList isBasic={false} title={"Advanced Courses"}/>
      <View style={styles.footer}>
        <Text style={{ fontSize: 15, color: 'gray' }}>Made with <Entypo name="heart" size={15} color="red" /> by Soumya</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingTop: Dimensions.get('screen').height * 0.01,
    paddingHorizontal: Dimensions.get('screen').width * 0.05,
    paddingBottom: Dimensions.get('screen').height * 0.1
  },
  footer: {
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    flex: 1, 
    paddingTop: Dimensions.get('screen').height * 0.025,
    paddingBottom: Dimensions.get('screen').height * 0.08
  }
})