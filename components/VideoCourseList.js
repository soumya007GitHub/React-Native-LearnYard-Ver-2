import { View, Text, ActivityIndicator, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalAPI from '../Shared/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function VideoCourseList() {
  
    const Navigation = useNavigation();
    const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetchVideoCourseData();
      }, []);
const fetchVideoCourseData = async () => {
  setIsLoading(true);
  try {
    const result = await GlobalAPI.getVideoCourse();
    // console.log('🌐 Video Course Result:', result);

    const resp = result.data.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  videoUrl: item.videoUrl,
  imageUrl: item.image?.[0]?.url || '',
  videoTopic: item.VideoTopic || []
}));


    setFetchedData(resp);
    console.log(fetchedData);
  } catch (error) {
    console.error('❌ Error fetching video course data:', error);
  }
  setIsLoading(false);
};


  return (
    <View style={styles.container}>
        <Text style={styles.text}>Video Courses</Text>
        {isLoading ? <ActivityIndicator size="50"/> : <FlatList
            horizontal = {true}
            showsHorizontalScrollIndicator={false}
            data={fetchedData}
            renderItem={({item}) => <TouchableOpacity style={styles.courseContainer} onPress={() => Navigation.navigate('CourseDetailsScreen', {
          videoCourseDetails: item,
        })
        }>
                <Image
            style={styles.courseImg}
            source={{
              uri: item.imageUrl,
            }}
          />
          <Text style={styles.courseText}>{item.title}</Text>
            </TouchableOpacity>}
            keyExtractor={item => item.id}
          />}
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 10,
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'left'
  },
  courseContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    width: Dimensions.get('screen').width*0.5,
  },
  courseImg: {
    width: Dimensions.get('screen').width*0.5,
    height: Dimensions.get('screen').height*0.15,
    resizeMode: 'cover',
    borderRadius: 15
  },
  courseText: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10
  }
});
