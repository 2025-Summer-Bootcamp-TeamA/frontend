  // src/components/BackButton.js
  import React from 'react';
  import { TouchableOpacity, Text, StyleSheet } from 'react-native';
  import { useNavigation } from '@react-navigation/native';

  export default function BackButton({ label = "←" }) {
    const navigation = useNavigation();
    return (
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      top: 40,
      left: 20,
      zIndex: 10,
      padding: 10,
    },
    text: {
      color: '#fff',
      fontSize: 28,
    },
  });