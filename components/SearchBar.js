import { View, TextInput, Dimensions, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="black" />
      <TextInput
          style={styles.inputField}
          onChangeText={null}
          value={null}
          placeholder="Search"
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    gap: 10
  },
  inputField: {
    height: 40,
    fontSize: 15,
    width: Dimensions.get('screen').width*0.8
  }
})