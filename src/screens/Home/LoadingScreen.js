import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetPhotos } from '../../store/photoSlice';
import { addVideo } from '../../store/librarySlice';
import CircularLoadingAnimation from '../../components/CircularLoadingAnimation';
import { createVideo } from '../../api/videos/createVideoApi';

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  // Redux에서 필요한 데이터 가져오기
  const avatarInfo = useSelector(state => state.avatar);
  const selectedMuseum = useSelector(state => state.museum.selectedMuseum);
  const ocrText = useSelector(state => state.ocr.ocrText);

  useEffect(() => {
    const createVideoAndNavigate = async () => {
      try {
        console.log('=== 영상 생성 시작 ===');
        console.log('avatarId:', avatarInfo.avatarId);
        console.log('museumName:', selectedMuseum?.name);
        console.log('ocrText:', ocrText);

        // API 호출
        const result = await createVideo({
          avatarId: avatarInfo.avatarId,
          museumName: selectedMuseum?.name,
          ocrText: ocrText
        });

        if (result.success) {
          console.log('영상 생성 성공:', result.data);
          // 성공 시 사진 초기화하고 VideoDetail 화면으로 이동
          dispatch(resetPhotos());
          dispatch(addVideo(result.data)); // 새로 생성된 영상을 librarySlice에 추가
          navigation.replace('VideoDetail', { videoId: result.videoId });
        } else {
          console.error('영상 생성 실패:', result.message);
          Alert.alert('오류', result.message || '영상 생성에 실패했습니다.');
          // 실패 시 이전 화면으로 돌아가기
          navigation.goBack();
        }
      } catch (error) {
        console.error('영상 생성 중 예상치 못한 오류:', error);
        Alert.alert('오류', '영상 생성 중 오류가 발생했습니다.');
        navigation.goBack();
      }
    };

    // 컴포넌트 마운트 시 API 호출 시작
    createVideoAndNavigate();
  }, [navigation, dispatch, avatarInfo.avatarId, selectedMuseum?.name, ocrText]);

  return (
    <ImageBackground
      source={require('../../../assets/backgrounds/로딩화면1.webp')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>준영님만의 영상을{'\n'}열심히 만드는중...</Text>
        
        <View style={styles.animationContainer}>
          <CircularLoadingAnimation size={335} strokeWidth={12} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    position: 'absolute',
    top: 118,
    left: 0,
    right: 0,
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 50,
    fontFamily: 'Cinzel',
    color: '#E1B668',
    textAlign: 'center',
    zIndex: 1,
  },
  animationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    color: '#fff', // 더 밝은 색상으로 변경
    fontFamily: 'NotoSerif-Bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  spinner: {
    marginTop: 10,
  },
});

export default LoadingScreen; 