import React from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';
import Header from '../../components/photo_upload/Header';
import UploadCard from '../../components/photo_upload/UploadCard';
import PrimaryButton from '../../components/photo_upload/PrimaryButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPhoto } from '../../store/photoSlice';

const PhotoUpload = ({ navigation }) => {
  // Redux에서 photos 배열 읽기
  const photos = useSelector(state => state.photo.photos);
  const dispatch = useDispatch();

  // 두 사진이 모두 null이 아닌지 확인
  const isBothPhotosSelected = photos[0] !== null && photos[1] !== null;

  const handleBack = () => {
    navigation.navigate('MainTabs');
  };
  const handleCapture = (index) => {
    navigation.navigate('CameraScreen', { index });
  };
  const handleNext = () => {
    // 1. OCR로 Text추출 Google Vision API 사용해야할 듯?
    navigation.navigate('Loading');
    // 2. 영상 생성 api 호출 예정
  };

  return (
    <ImageBackground
      source={require('../../../assets/backgrounds/바탕화면.webp')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Header title="사진 업로드" onBackPress={handleBack} />
        <View style={styles.centerContent}>
          <UploadCard
            photo={photos[0]}
            onCapture={() => handleCapture(0)}
            onRemove={() => dispatch(setPhoto({ index: 0, uri: null }))}
          />
          <UploadCard
            photo={photos[1]}
            onCapture={() => handleCapture(1)}
            onRemove={() => dispatch(setPhoto({ index: 1, uri: null }))}
            title = "작품 설명 업로드"
            subtitle = "작품 설명을 화면 중앙에 맞춰 촬영해주세요"
          />
        </View>
        <View style={styles.bottomButton}>
          <PrimaryButton title="영상 만들기" onPress={handleNext} isActive={isBothPhotosSelected} />
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