import { View, Text, Image, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import GlobalAPI from '../Shared/GlobalAPI';
import { useEffect, useState } from 'react';

export default function Slider() {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSliderData();
  }, []);

  const fetchSliderData = async () => {
    setIsLoading(true);
    const result = await GlobalAPI.getSlider();
    // console.log('🌐 Slider Result:', result);

    const resp = result.data.map((item) => ({
      id: item.id,
      name: item.Name,
      imageUrl: item.Image?.url || null,
    }));

    setFetchedData(resp);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.text}>Scroll to see more courses</Text>
    {isLoading ? <ActivityIndicator size="50"/> : <FlatList
        horizontal = {true}
        showsHorizontalScrollIndicator={false}
        data={fetchedData}
        renderItem={({item}) => <View style={styles.sliderContainer}>
            <Image
        style={styles.sliderImg}
        source={{
          uri: item.imageUrl,
        }}
      />
      <Text style={styles.sliderText}>{item.name}</Text>
        </View>}
        keyExtractor={item => item.id}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 10,
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'left'
  },
  sliderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  sliderImg: {
    width: Dimensions.get('screen').width*0.8,
    height: Dimensions.get('screen').height*0.25,
    resizeMode: 'cover',
    borderRadius: 15
  },
  sliderText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10
  }
});
