import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetPhotos } from '../../store/photoSlice';

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // API 호출 데모: 2초 후 VideoDetailScreen으로 이동
    const timer = setTimeout(() => {
      dispatch(resetPhotos());
      navigation.replace('VideoDetail');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation, dispatch]);

  return (
    <ImageBackground
      source={require('../../../assets/backgrounds/바탕화면.webp')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.center}>
        <Image
          source={require('../../../assets/logos/app_logo.webp')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>작품을 전시 준비 중입니다...</Text>
        <ActivityIndicator size="large" color="#8B5C2A" style={styles.spinner} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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