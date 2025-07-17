import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const XButton = ({ onPress }) => (
  <TouchableOpacity style={styles.x} onPress={onPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
    <Text style={styles.text}>✕</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  x: {
    position: 'absolute',
    top: 40,
    right: 25,
    zIndex: 10,
  },
  text: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default XButton; 