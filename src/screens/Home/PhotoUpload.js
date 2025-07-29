import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';
import Header from '../../components/photo_upload/Header';
import UploadCard from '../../components/photo_upload/UploadCard';
import PrimaryButton from '../../components/photo_upload/PrimaryButton';
import RetryModal from '../../components/photo_upload/RetryModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPhoto } from '../../store/photoSlice';
import { selectSelectedMuseum } from '../../store/museumSlice';

const PhotoUpload = ({ navigation }) => {
  // Redux에서 photos 배열과 avatar 정보 읽기
  const photos = useSelector(state => state.photo.photos);
  const avatarInfo = useSelector(state => state.avatar);
  const selectedMuseum = useSelector(selectSelectedMuseum);
  const ocrText = useSelector(state => state.ocr.ocrText);
  
  // API 호출 상태 확인
  const avatarLoading = useSelector(state => state.avatar.isLoading);
  const avatarSuccess = useSelector(state => state.avatar.isSuccess);
  const avatarError = useSelector(state => state.avatar.error);
  const ocrLoading = useSelector(state => state.ocr.isLoading);
  const ocrSuccess = useSelector(state => state.ocr.isSuccess);
  const ocrError = useSelector(state => state.ocr.error);
  
  const dispatch = useDispatch();

  // RetryModal 상태
  const [retryModalVisible, setRetryModalVisible] = useState(false);
  const [retryModalConfig, setRetryModalConfig] = useState({
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // 두 사진이 모두 null이 아닌지 확인
  const isBothPhotosSelected = photos[0] !== null && photos[1] !== null;

  const handleBack = () => {
    navigation.navigate('MainTabs');
  };
  const handleCapture = (index) => {
    navigation.navigate('CameraScreen', { index });
  };
  const handleNext = () => {

    // 기본 유효성 검사
    if (!selectedMuseum) {
      Alert.alert('오류', '박물관을 선택해주세요.');
      return;
    }

    // API 호출 상태 확인
    const isAvatarLoading = avatarLoading;
    const isOcrLoading = ocrLoading;
    const hasAvatarError = avatarError;
    const hasOcrError = ocrError;
    const hasAvatarSuccess = avatarSuccess;
    const hasOcrSuccess = ocrSuccess;

    console.log('=== 조건 확인 ===');
    console.log('isAvatarLoading:', isAvatarLoading);
    console.log('isOcrLoading:', isOcrLoading);
    console.log('조건 결과:', isAvatarLoading || isOcrLoading);

    // 아직 API 호출이 진행 중인 경우
    if (isAvatarLoading || isOcrLoading) {
      console.log('로딩 중이므로 Alert 표시');
      Alert.alert('처리 중', '사진을 처리하고 있습니다. 잠시만 기다려주세요.');
      return;
    }

    // 아바타 생성 실패
    if (hasAvatarError) {
      setRetryModalConfig({
        title: '작품 인식 실패',
        message: '작품이 제대로 인식되지 않았습니다.\n\n• 작품이 화면 중앙에 배치해주세요\n• 작품이 선명하게 보이게 촬영해주세요\n• 다른 각도에서 다시 촬영해보세요',
        onConfirm: () => {
          setRetryModalVisible(false);
          handleCapture(0); // 첫 번째 사진 재촬영
        }
      });
      setRetryModalVisible(true);
      return;
    }

    // OCR 처리 실패
    if (hasOcrError) {
      setRetryModalConfig({
        title: '텍스트 인식 실패',
        message: '작품 설명이 제대로 인식되지 않았습니다.\n\n• 설명 텍스트가 화면 중앙에 있는지 확인해주세요\n• 텍스트가 선명하고 읽기 쉬운지 확인해주세요\n• 조명이 충분한지 확인해주세요',
        onConfirm: () => {
          setRetryModalVisible(false);
          handleCapture(1); // 두 번째 사진 재촬영
        }
      });
      setRetryModalVisible(true);
      return;
    }

    // API 호출이 아직 완료되지 않은 경우
    if (!hasAvatarSuccess || !hasOcrSuccess) {
      Alert.alert('처리 중', '사진을 처리하고 있습니다. 잠시만 기다려주세요.');
      console.log('처리 중2222');
      return;
    }

    // 모든 검증 통과 시 Loading 화면으로 이동
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
      <RetryModal
        visible={retryModalVisible}
        title={retryModalConfig.title}
        message={retryModalConfig.message}
        onConfirm={retryModalConfig.onConfirm}
      />
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