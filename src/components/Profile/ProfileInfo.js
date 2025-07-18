import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileInfo({ username }) {
  return (
    <View style={styles.profileRow}>
      <Image
        source={require('../../../assets/backgrounds/Profile_frame.jpg')}
        style={styles.profileFrame}
      />
      <Text style={styles.username}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    width: '80%',
    justifyContent: 'center',
    marginLeft: -80,
  },
  profileFrame: {
    width: 130,
    height: 128,
    marginRight: 24,
    resizeMode: 'contain',
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 93,
  },
});