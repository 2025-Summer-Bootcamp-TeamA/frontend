import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileStatItem from './ProfileStatItem';

export default function ProfileStats({ visitedMuseums, createdVideos, savedItems }) {
  return (
    <View style={styles.statsRow}>
      <ProfileStatItem number={visitedMuseums} label="방문한 박물관" />
      <ProfileStatItem number={createdVideos} label="생성한 영상" />
      <ProfileStatItem number={savedItems} label="보관함" />
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
});