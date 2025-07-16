import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Onboarding1 = () => (
  <View style={styles.container}>
    <Text style={styles.text}>온보딩 1 화면</Text>
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

export default Onboarding1; 