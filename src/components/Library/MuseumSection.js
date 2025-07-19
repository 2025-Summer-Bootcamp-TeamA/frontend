import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ArtworkCard from './ArtworkCard';

const MuseumSection = ({ title, artworks, onPressArtwork }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={artworks}
      renderItem={({ item }) => (
        <ArtworkCard {...item} onPress={() => onPressArtwork && onPressArtwork(item.id)} />
      )}
      keyExtractor={(item, index) => item.id ? String(item.id) : String(index)}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={{ width: 17 }} />}
    />
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
    paddingLeft: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    marginLeft: 4,
  },
  listContent: {
    paddingLeft: 4,
    paddingRight: 4,
  },
});

export default MuseumSection; 