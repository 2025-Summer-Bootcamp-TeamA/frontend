import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileTitle() {
  return (
    <>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.divider} />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    fontFamily: 'NotoSerif',
    letterSpacing: 1,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#fff',
    opacity: 0.8,
    marginBottom: 24,
  },
});