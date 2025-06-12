import { View, Button, Text, Dimensions } from 'react-native';
import React, { useState, useCallback } from "react";
import YoutubePlayer from 'react-native-youtube-iframe';

export default function ChapterScreen({ route }) {
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);
  const { chapterTextDetails, chapterVideoDetails } = route.params;

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginBottom: Dimensions.get('screen').height * 0.05 }}>
      {chapterTextDetails ? (
        <>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            {chapterTextDetails.Topic}
          </Text>
          <Text style={{ fontSize: 15 }}>
            {chapterTextDetails.description}
          </Text>
        </>
      ) : chapterVideoDetails ? (
        <>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            {chapterVideoDetails.name}
          </Text>
          <YoutubePlayer
        height={200}
        play={true}
        videoId={chapterVideoDetails.videoUrl}
      />
          <Text style={{ fontSize: 15 }}>
            {chapterVideoDetails.description}
          </Text>
        </>
      ) : (
        <Text>No Chapter Data Available</Text>
      )}
    </View>
  );
}
