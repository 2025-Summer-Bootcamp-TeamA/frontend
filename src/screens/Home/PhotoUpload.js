import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Header from '../../components/photo_upload/Header';
import UploadCard from '../../components/photo_upload/UploadCard';
import PrimaryButton from '../../components/photo_upload/PrimaryButton';

const PhotoUpload = () => {
  const handleBack = () => {
    // 뒤로가기 동작 구현 (예: navigation.goBack())
  };
  const handleCapture = () => {
    // 촬영하기 버튼 동작 구현
  };
  const handleNext = () => {
    // 다음 버튼 동작 구현
  };

  return (
    <ImageBackground
      source={require('../../../assets/backgrounds/바탕화면.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Header title="사진 업로드" onBackPress={handleBack} />
        <View style={styles.centerContent}>
          <UploadCard onCapture={handleCapture} />
          <UploadCard onCapture={handleCapture} />
        </View>
        <View style={styles.bottomButton}>
          <PrimaryButton title="영상 만들기" onPress={handleNext} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    padding: 40,
  },
});

export default PhotoUpload; 