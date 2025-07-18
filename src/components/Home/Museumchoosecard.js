import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MuseumChooseCard({ name, address, pieces, onPress }) {
  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={onPress} activeOpacity={0.8}>
      <BlurView intensity={90} tint="light" style={styles.blurContainer}>
        <View style={styles.content}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.address}>{address}</Text>
            <Text style={styles.pieces}>{pieces}</Text>
          </View>
          <Icon name="chevron-forward" size={28} color="#fff" />
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  blurContainer: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.05)', // 더 연하게!
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { color: '#fff', fontWeight: 'bold', fontSize: 20, marginBottom: 4 },
  address: { color: '#fff', fontSize: 14, marginBottom: 2 },
  pieces: { color: '#fff', fontSize: 13, opacity: 0.8 },
});