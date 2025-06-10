import { View, TouchableOpacity, Text, ActivityIndicator, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import GlobalAPI from '../Shared/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function CourseList(props) {
  const Navigation = useNavigation();
  const isBasic = props.isBasic;
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchVideoCourseData(isBasic);
  }, []);
  const fetchVideoCourseData = async (isBasic) => {
    setIsLoading(true);
    const result = await GlobalAPI.getCourseList(isBasic);
    // console.log('🌐 Course List Result:', result);

    const resp = result.data.map((item) => ({
      id: item.id,
      name: item.name,
      isBasic: item.isBasic,
      description: item.description,
      imageUrl: item.image[0].formats.thumbnail.url,
      topic: item.Topic
    }));

    setFetchedData(resp);
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Available Courses</Text>
      {isLoading ? <ActivityIndicator size="50" /> : <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={fetchedData}
        renderItem={({ item }) => <TouchableOpacity style={styles.courseContainer} onPress={() => Navigation.navigate('CourseDetailsScreen', {
          courseDetails: item,
        })
        }>
          <Image
            style={styles.courseImg}
            source={{
              uri: item.imageUrl,
            }}
          />
          <Text style={styles.courseText}>{item.name}</Text>
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
    width: Dimensions.get('screen').width * 0.5,
  },
  courseImg: {
    width: Dimensions.get('screen').width * 0.5,
    height: Dimensions.get('screen').height * 0.15,
    resizeMode: 'cover',
    borderRadius: 15
  },
  courseText: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10
  }
});
