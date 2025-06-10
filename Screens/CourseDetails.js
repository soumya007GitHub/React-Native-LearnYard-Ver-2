import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function CourseDetails({ route }) {
  const { courseDetails } = route.params;
  const navigation = useNavigation();
    useEffect(()=>{
        console.log(courseDetails);
    }, []);
    useLayoutEffect(() => {
         navigation.setOptions({
           title: courseDetails.name,
         });
       }, [navigation, courseDetails.name]);
  return (
    <View>
      <Text>CourseDetails</Text>
    </View>
  )
}