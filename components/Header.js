import { View, Text, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import Services from '../Shared/Services';
import { useContext } from 'react';

export default function Header() {
    const {userData, setUserData} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View>
        <Text>Welcome,</Text>
        <Text style={styles.name}>{userData.name}</Text>
      </View>
      <Image source={{uri: userData.photo}} style={styles.profilePhoto}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'static'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 100
  }
})