import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import * as ImageManipulator from 'expo-image-manipulator';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setPhoto } from '../../store/photoSlice';

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
  const [photoLocal, setPhotoLocal] = useState(null); // 이름 변경

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

  // 사진 촬영 함수 (프레임 영역만 crop)
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsProcessing(true);
        const result = await cameraRef.current.takePictureAsync();
        // 이미지 크기 정보 필요
        const { width: imgW, height: imgH, uri } = result;
        // 프레임의 위치/크기를 이미지 해상도 기준으로 환산
        const cropLeft = Math.round((FRAME_LEFT / SCREEN_WIDTH) * imgW);
        const cropTop = Math.round((FRAME_TOP / SCREEN_HEIGHT) * imgH);
        const cropWidth = Math.round((FRAME_WIDTH / SCREEN_WIDTH) * imgW);
        const cropHeight = Math.round((FRAME_HEIGHT / SCREEN_HEIGHT) * imgH);
        const cropResult = await ImageManipulator.manipulateAsync(
          uri,
          [{ crop: { originX: cropLeft, originY: cropTop, width: cropWidth, height: cropHeight } }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        setPhotoLocal(cropResult.uri); // 이름 변경
      } catch (e) {
        // 에러 처리
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // 재촬영
  const handleRetake = () => setPhotoLocal(null); // 이름 변경

  // 확인(추후 로직 연결)
  const handleConfirm = () => {
    if (photoLocal && typeof route.params?.index === 'number') {
      dispatch(setPhoto({ index: route.params.index, uri: photoLocal }));
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Animated.View style={[styles.animatedContainer, animatedStyle]}>
      {/* X 버튼 */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
      {/* 사진 미리보기 */}
      {photoLocal ? (
        <>
          <Image source={{ uri: photoLocal }} style={styles.preview} resizeMode="cover" />
          <View style={styles.previewButtonRow}>
            <TouchableOpacity style={styles.button} onPress={handleRetake}>
              <Text style={styles.buttonText}>재촬영</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {/* 안내 텍스트 */}
          <View style={styles.guideTextContainer} pointerEvents="none">
            <Text style={styles.guideText}> 촬영하고자 하는 작품을{'\n'}
            화면 중앙에 맞춰 찍어주세요</Text>
          </View>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            photo={true}
          />
          {/* Blur 마스킹: 프레임 영역을 제외한 4개 영역을 정확히 맞닿게 */}
          <View style={styles.blurContainer} pointerEvents="none">
            {/* 위쪽 */}
            <BlurView intensity={25} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: FRAME_TOP }} />
            {/* 아래쪽 */}
            <BlurView intensity={25} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: FRAME_TOP }} />
            {/* 왼쪽 */}
            <BlurView intensity={10} style={{ position: 'absolute', top: FRAME_TOP, left: 0, width: FRAME_LEFT, height: FRAME_HEIGHT }} />
            {/* 오른쪽 */}
            <BlurView intensity={10} style={{ position: 'absolute', top: FRAME_TOP, right: 0, width: FRAME_LEFT, height: FRAME_HEIGHT }} />
          </View>
          {/* 9:16 직사각형 프레임 */}
          <View style={styles.rectFrame} pointerEvents="none" />
          {/* 사진 찍기 버튼 */}
          <View style={styles.buttonContainer} pointerEvents="box-none">
            <TouchableOpacity style={styles.shutterButton} onPress={takePicture} disabled={isProcessing}>
              <View style={styles.shutterOuter}>
                <View style={styles.shutterInner} />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  rectFrame: {
    position: 'absolute',
    top: FRAME_TOP,
    left: FRAME_LEFT,
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    borderWidth: 3,
    borderColor: '#cccccc',
    borderRadius: 5,
    zIndex: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 24,
    zIndex: 20,
    padding: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
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
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
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
    top: FRAME_TOP - 65, // 프레임 위쪽에 약간 여백을 두고 배치
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
});

export default CameraScreen; 