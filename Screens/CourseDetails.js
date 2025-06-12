import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CourseDetails({ route }) {
  const navigation = useNavigation();
  const { courseDetails, videoCourseDetails } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: courseDetails?.name || videoCourseDetails?.title || 'Course Details',
    });
  }, [navigation, courseDetails, videoCourseDetails]);

  const renderCourseHeader = () => (
    <View>
      <Image style={styles.image} source={{ uri: courseDetails?.imageUrl }} />
      <Text style={styles.desc}>{courseDetails?.description}</Text>
      <Text style={styles.header}>Chapters</Text>
    </View>
  );

  const renderVideoCourseHeader = () => (
    <View>
      <Image
        style={styles.image}
        source={{ uri: videoCourseDetails?.imageUrl || 'https://cnopt.tn/wp-content/uploads/2023/06/default-image.jpg' }}
      />
      <Text style={styles.desc}>{videoCourseDetails?.description}</Text>
      <Text style={styles.header}>Chapters</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {courseDetails ? (
        <FlatList
          ListHeaderComponent={renderCourseHeader}
          data={courseDetails.topic || []}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.chapter}
              onPress={() =>
                navigation.navigate('ChapterScreen', {
                  chapterTextDetails: item,
                })
              }
            >
              <Text style={styles.chapterTitle}>{index + 1}. {item.Topic}</Text>
              <AntDesign name="play" size={20} color="#0a9ac2" />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : videoCourseDetails ? (
        <FlatList
          ListHeaderComponent={renderVideoCourseHeader}
          data={videoCourseDetails.videoTopic || []}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.chapter}
              onPress={() =>
                navigation.navigate('ChapterScreen', {
                  chapterVideoDetails: item,
                })
              }
            >
              <Text style={styles.chapterTitle}>{index + 1}. {item.name}</Text>
              <AntDesign name="play" size={20} color="#0a9ac2" />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noDataText}>No course data available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: Dimensions.get('screen').height * 0.25,
    width: 'auto',
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
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});
