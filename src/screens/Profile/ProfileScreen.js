import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import ProfileTitle from '../../components/Profile/ProfileTitle';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileStats from '../../components/Profile/ProfileStats';
import ProfileActions from '../../components/Profile/ProfileActions';

export default function ProfileScreen() {
  return (
    <ImageBackground
      source={require('../../../assets/backgrounds/바탕화면.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ProfileInfo username="User님" />
        <ProfileStats />
        <ProfileActions />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 45,
  },
});