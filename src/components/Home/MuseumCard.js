import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MuseumCard = ({ image, name, address }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} resizeMode="cover" />
    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
    <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">{address}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 170, // 카드 가로 크기 고정
    padding: 0,
    margin: 0,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 160,
    height: 90,
    marginBottom: 12,
  },
  name: {
    color: '#fff',
    fontWeight: '600', // Semi Bold
    fontSize: 16,
    lineHeight: 24,
  },
  address: {
    color: '#A89EB8',
    fontWeight: '400', // Regular
    fontSize: 14,
    lineHeight: 21,
  },
});

export default MuseumCard; 