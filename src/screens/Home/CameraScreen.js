import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setPhoto } from '../../store/photoSlice';
import { setAvatarInfo, setAvatarLoading, setAvatarError } from '../../store/avatarSlice';
import { setOcrText, setOcrLoading, setOcrError } from '../../store/ocrSlice';
import { createAvatar } from '../../api/avatars/createAvatarApi';
import { performOcrWithUri } from '../../api/ocr/ocrApi';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const FRAME_WIDTH = Math.round(SCREEN_WIDTH * 0.8); // 화면의 80% 너비
const FRAME_HEIGHT = Math.round(FRAME_WIDTH * 16 / 9); // 9:16 비율
const FRAME_TOP = (SCREEN_HEIGHT - FRAME_HEIGHT) / 2;
const FRAME_LEFT = (SCREEN_WIDTH - FRAME_WIDTH) / 2;

const CameraScreen = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [photoLocal, setPhotoLocal] = useState(null);

  // 아래에서 위로 슬라이드 인 애니메이션
  const translateY = useSharedValue(1000);
  useEffect(() => {
    translateY.value = withTiming(0, { duration: 600 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>카메라 권한이 필요합니다.</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>권한 허용</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 사진 촬영 함수 (전체 촬영 후 미리보기에서 프레임 영역만 표시)
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsProcessing(true);
        
        // 전체 화면 촬영
        const result = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
          exif: false,
          skipProcessing: false,
        });

        const { width: imgW, height: imgH, uri } = result;

        // 1. 이미지 해상도 검증
        if (imgW < 800 || imgH < 800) {
          Alert.alert('오류', '이미지 해상도가 너무 낮습니다. 다시 촬영해 주세요.');
          return;
        }

        // 2. 전체 이미지 저장 (미리보기에서 프레임 영역만 표시)
        setPhotoLocal(uri);
      } catch (e) {
        console.error('Photo capture failed:', e);
        Alert.alert('오류', '사진 촬영 중 오류가 발생했습니다.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // 재촬영
  const handleRetake = () => setPhotoLocal(null);

  // 확인 버튼 클릭 시 API 호출 시작하고 즉시 PhotoUpload로 이동
  const handleConfirm = async () => {
    const photoIndex = route.params?.index;
    
    // index가 유효한지 확인
    if (typeof photoIndex !== 'number' || photoIndex < 0 || photoIndex > 1) {
      console.warn('Invalid photo index parameter');
      navigation.goBack();
      return;
    }

    // 사진 저장
    if (photoLocal && typeof photoIndex === 'number' && photoIndex >= 0) {
      dispatch(setPhoto({ index: photoIndex, uri: photoLocal }));
    } else {
      console.warn('Invalid photo or index parameter');
      navigation.goBack();
      return;
    }

    // API 호출을 먼저 시작 (백그라운드에서 비동기로 실행)
    if (photoIndex === 0) {
      // 첫 번째 사진 (index 0): 아바타 생성 API 호출
      console.log('=== 아바타 생성 API 호출 시작 (백그라운드) ===');
      
      // 로딩 상태 시작
      dispatch(setAvatarLoading(true));
      
      // 비동기로 API 호출
      createAvatar(photoLocal)
        .then(result => {
          console.log('=== 아바타 생성 API 응답 결과 ===');
          console.log('성공 여부:', result.success);
          
          if (result.success) {
            console.log('아바타 ID:', result.avatar_id);
            console.log('썸네일 URL:', result.thumbnail_url);
            console.log('업로드된 원본 URL:', result.uploaded_url);
            console.log('메시지:', result.message);
            
            // 성공 시 avatar 정보를 Redux store에 저장
            dispatch(setAvatarInfo({
              avatar_id: result.avatar_id,
              thumbnail_url: result.thumbnail_url,
              uploaded_url: result.uploaded_url
            }));
          } else {
            console.log('에러 타입:', result.error);
            console.log('에러 메시지:', result.message);
            console.log('재시도 필요:', result.retry_required);
            if (result.suggestion) {
              console.log('개선 제안:', result.suggestion);
            }
            if (result.detail) {
              console.log('상세 에러:', result.detail);
            }
            
            // 실패 시 에러 상태 저장 (로딩 상태도 false로 설정됨)
            console.log('=== setAvatarError 호출 ===');
            console.log('에러 메시지:', result.message || '아바타 생성에 실패했습니다.');
            dispatch(setAvatarError(result.message || '아바타 생성에 실패했습니다.'));
          }
        })
        .catch(error => {
          console.error('=== 아바타 생성 API 호출 실패 ===');
          console.error('에러:', error);
          dispatch(setAvatarError('아바타 생성 중 오류가 발생했습니다.'));
        });
        
    } else if (photoIndex === 1) {
      // 두 번째 사진 (index 1): OCR 텍스트 추출 API 호출
      console.log('=== OCR 텍스트 추출 API 호출 시작 (백그라운드) ===');
      
      // 로딩 상태 시작
      dispatch(setOcrLoading(true));
      
      // 비동기로 API 호출
      performOcrWithUri(photoLocal)
        .then(result => {
          console.log('=== OCR API 응답 결과 ===');
          console.log('추출된 텍스트:', result.ocr_text);
          
          // 성공 시 OCR 텍스트를 Redux store에 저장
          dispatch(setOcrText(result.ocr_text));
        })
        .catch(error => {
          console.error('=== OCR API 호출 실패 ===');
          console.error('에러:', error);
          dispatch(setOcrError('OCR 처리 중 오류가 발생했습니다.'));
        });
    }

    // API 호출 시작 후 화면 이동
    navigation.goBack();
  };



  return (
    <Animated.View style={[styles.animatedContainer, animatedStyle]}>
      {/* 사진 미리보기 */}
      {photoLocal ? (
        <>
          <Image 
            source={{ uri: photoLocal }} 
            style={styles.preview} 
            resizeMode="cover"
          />
          <View style={styles.previewButtonRow}>
            <TouchableOpacity style={styles.button} onPress={handleRetake} disabled={isProcessing}>
              <Text style={styles.buttonText}>재촬영</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleConfirm} disabled={isProcessing}>
              {isProcessing ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#E1B668" />
                  <Text style={[styles.buttonText, styles.loadingText]}>처리중...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>확인</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {/* X 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* 안내 텍스트 */}
          <View style={styles.guideTextContainer} pointerEvents="none">
            <Text style={styles.guideText}> 촬영하고자 하는 작품을{"\n"}
            화면 중앙에 맞춰 찍어주세요</Text>
          </View>

          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            photo={true}
          />

          {/* 위아래만 검은색 투명 오버레이 */}
          <View style={styles.blurContainer} pointerEvents="none">
            {/* 위쪽 */}
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: FRAME_TOP, backgroundColor: 'rgba(0,0,0,0.4)' }} />
            {/* 아래쪽 */}
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: FRAME_TOP, backgroundColor: 'rgba(0,0,0,0.4)' }} />
          </View>


  

          {/* 셔터 버튼 */}
          <View style={styles.shutterContainer} pointerEvents="box-none">
            <TouchableOpacity style={styles.shutterButton} onPress={takePicture} disabled={isProcessing}>
              <View style={styles.shutterOuter}>
                <View style={styles.shutterInner} />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* 처리 중 오버레이 */}
      {isProcessing && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* 재촬영 모달 */}
      {/* RetryModal 컴포넌트는 더 이상 사용되지 않으므로 제거 */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  preview: {
    position: 'absolute',
    top: FRAME_TOP,
    left: FRAME_LEFT,
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    zIndex: 30,
  },
  previewButtonRow: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 40,
  },
  guideTextContainer: {
    position: 'absolute',
    top: FRAME_TOP - 65,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 30,
  },
  guideText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
    lineHeight: 20,
  },
  shutterContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
  },
  shutterButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  closeText: {
    fontSize: 24,
    color: '#fff',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 8,
  },

});

export default CameraScreen; 