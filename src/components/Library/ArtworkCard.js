import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ArtworkCard = ({ image, title, artist, onPress }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
    <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">{artist}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: 116,
    alignItems: 'flex-start',
  },
  image: {
    width: 116,
    height: 163,
    borderRadius: 5,
    marginBottom: 13,
    backgroundColor: '#222', // 이미지 로딩 전 배경
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600', // semiBold
    marginBottom: 3,
    textAlign: 'left',
    paddingLeft: 2,
    width: '100%',
  },
  artist: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500', // medium
    textAlign: 'left',
    paddingLeft: 2,
    width: '100%',
  },
});

export default ArtworkCard; 