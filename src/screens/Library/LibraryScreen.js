import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LibraryScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>라이브러리 화면</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LibraryScreen; 