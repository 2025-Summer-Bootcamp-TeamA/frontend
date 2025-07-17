import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SkipButton from './SkipButton';
import OnboardingImage from './OnboardingImage';
import OnboardingDescription from './OnboardingDescription';

const OnboardingTemplate = ({ navigation, imageSource, description, subText, skipButton }) => (
  <View style={styles.container}>
    {skipButton
      ? skipButton
      :  <SkipButton onPress={() => navigation?.replace?.('MainTabs')} />
      // 나중에 PhotoUpLoad.js로 이동하는 것으로 변경
    }
    <OnboardingImage source={imageSource} />
    <OnboardingDescription>
      {description}
    </OnboardingDescription>
    <View style={styles.subBox}>
      <Text style={styles.icon}>ⓘ</Text>
      <Text style={styles.subText}>{subText}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    position: 'relative',
  },
  subBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 32,
    marginHorizontal: 24,
    maxWidth: 360,
  },
  icon: {
    color: '#fff',
    fontSize: 18,
    marginRight: 21,
    marginTop: 6,
  },
  subText: {
    color: '#ccc',
    fontSize: 18,
    lineHeight: 33,
    flex: 1,
    opacity: 0.7,
    fontWeight: 'bold',
  },
});

export default OnboardingTemplate; 