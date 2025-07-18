import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileStatItem from './ProfileStatItem';

export default function ProfileStats() {
  return (
    <View style={styles.statsRow}>
      <ProfileStatItem number={3} label="방문한 박물관" />
      <ProfileStatItem number={21} label="생성한 영상" />
      <ProfileStatItem number={11} label="보관함" />
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