import React from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';
import Header from '../../components/photo_upload/Header';
import UploadCard from '../../components/photo_upload/UploadCard';
import PrimaryButton from '../../components/photo_upload/PrimaryButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPhoto } from '../../store/photoSlice';
import { selectSelectedMuseum } from '../../store/museumSlice';

const PhotoUpload = ({ navigation }) => {
  // Redux에서 photos 배열과 avatar 정보 읽기
  const photos = useSelector(state => state.photo.photos);
  const avatarInfo = useSelector(state => state.avatar);
  const selectedMuseum = useSelector(selectSelectedMuseum);
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
    // 1. avatar_id 유효성 검사
    if (!avatarInfo.avatarId) {
      Alert.alert('오류', '아바타 정보가 없습니다. 작품 사진을 다시 촬영해주세요.');
      return;
    }

    // 2. 박물관 정보 유효성 검사
    if (!selectedMuseum) {
      Alert.alert('오류', '박물관을 선택해주세요.');
      return;
    }

    // 3. OCR 텍스트 유효성 검사 (추후 OCR Redux slice 생성 후 활성화)
    /*
    if (!ocrInfo.ocrText) {
      Alert.alert('오류', '작품 설명을 촬영해주세요.');
      return;
    }
    */

    console.log('=== 영상 생성 준비 완료 ===');
    console.log('avatar_id:', avatarInfo.avatarId);
    console.log('박물관 이름:', selectedMuseum.name);
    // console.log('OCR 텍스트:', ocrInfo.ocrText); // 추후 활성화
    
    // 4. 모든 검증 통과 시 Loading 화면으로 이동
    navigation.navigate('Loading');
  };

  return (
    <ImageBackground
      source={require('../../../assets/backgrounds/photoUpload.webp')}
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