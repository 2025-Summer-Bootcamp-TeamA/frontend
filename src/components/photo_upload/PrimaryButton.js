import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PrimaryButton = ({ onPress, title, style, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, isActive ? styles.active : styles.inactive, style]}
      onPress={isActive ? onPress : undefined}
      disabled={!isActive}
      activeOpacity={isActive ? 0.7 : 1}
    >
      <Text style={[styles.primaryButtonText, isActive ? styles.activeText : styles.inactiveText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  active: {
    backgroundColor: '#E1B668', // 금색
    borderColor:  '#E1B668',
  },
  inactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
    opacity: 0.8,
  },
  inactiveText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default PrimaryButton; 