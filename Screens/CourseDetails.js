import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';

const Stack = createNativeStackNavigator();

export default function CourseDetails({ route }) {
    const Navigation = useNavigation();
  const { courseDetails } = route.params;
  const navigation = useNavigation();
    useEffect(()=>{
        console.log(courseDetails);
    }, []);
    useLayoutEffect(() => {
         navigation.setOptions({
           title: courseDetails.name,
         });
       }, [navigation, courseDetails]);

       const renderHeader = () => (
    <View>
      <Image style={styles.image} source={{ uri: courseDetails.imageUrl }} />
      <Text style={styles.desc}>{courseDetails.description}</Text>
      <Text style={styles.header}>Chapters</Text>
    </View>
  );
  return (
    <View style={styles.container}>
       <FlatList
       ListHeaderComponent={renderHeader}
       style={{marginBottom: 20}}
        data={courseDetails.topic}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <TouchableOpacity style={styles.chapter} onPress={() => Navigation.navigate('ChapterScreen', {
          chapterDetails: courseDetails.topic[index],
        })
        }>
        <Text style={styles.chapterTitle}>{index+1}. {item.Topic}</Text>
        <AntDesign name="play" size={20} color="#0a9ac2" />
        </TouchableOpacity>}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    height: Dimensions.get('screen').height * 0.25,
    width: '100%',
    borderRadius: 10,
  },
  desc: {
    fontSize: 16,
    marginVertical: 10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  chapter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#DFDFDF',
    padding: 15,
    borderRadius: 10,
  },
  chapterTitle: {
    fontSize: 18,
  },
})