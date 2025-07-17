import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export default function ArtworkInfo({ title, year, artist, desc }) {
  return (
    <BlurView intensity={40} tint="dark" style={styles.bottomPanel}>
      <Text style={styles.title}>
        {title} <Text style={styles.year}>{year}</Text>
      </Text>
      <Text style={styles.artist}>{artist}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  bottomPanel: {
    width: '100%',
    backgroundColor: 'rgba(34, 24, 15, 0.3)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    overflow: 'hidden',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  year: {
    color: '#d2b48c',
    fontSize: 16,
    fontWeight: 'normal',
  },
  artist: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
  },
  desc: {
    color: '#fff',
    marginTop: 8,
    marginBottom: 16,
  },
});