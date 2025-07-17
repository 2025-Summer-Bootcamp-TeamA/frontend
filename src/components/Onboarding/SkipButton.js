import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SkipButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.skip}
    onPress={onPress}
    activeOpacity={0.7}
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
  >
    <Text style={styles.text}>skip</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  skip: {
    position: 'absolute',
    top: 46,
    right: 24,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)', // 살짝 투명한 배경
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default SkipButton; 