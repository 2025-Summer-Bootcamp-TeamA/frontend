import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const OnboardingImage = ({ source }) => (
  <View style={styles.container}>
    <Image source={source} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 101,
  },
  image: {
    width: 360,
    height: 360,
    borderRadius: 10,
  },
});

export default OnboardingImage; 