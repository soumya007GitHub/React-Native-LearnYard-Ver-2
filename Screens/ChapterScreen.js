import { View, Text, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function ChapterScreen({ route }) {
    const { chapterDetails } = route.params;
    useEffect(()=>{
            console.log(chapterDetails);
        }, []);
  return (
    <View style={{paddingHorizontal: 20, paddingVertical: 20, marginBottom: Dimensions.get('screen').height*0.05}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>{chapterDetails.Topic}</Text>
      <Text style={{fontSize: 15}}>{chapterDetails.description}</Text>
    </View>
  )
}