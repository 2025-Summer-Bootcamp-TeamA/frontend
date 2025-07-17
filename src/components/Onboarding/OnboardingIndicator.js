import React from 'react';
import { View, StyleSheet } from 'react-native';

const OnboardingIndicator = ({ total, current }) => (
  <View style={styles.container}>
    {Array.from({ length: total }).map((_, idx) => (
      <View
        key={idx}
        style={[
          styles.dot,
          current === idx && styles.activeDot,
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 55,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
  },
});

export default OnboardingIndicator; 