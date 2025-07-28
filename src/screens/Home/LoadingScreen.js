import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetPhotos } from '../../store/photoSlice';
import CircularLoadingAnimation from '../../components/CircularLoadingAnimation';

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // API 호출 데모: 2초 후 VideoDetailScreen으로 이동
  //   const timer = setTimeout(() => {
  //     dispatch(resetPhotos());
  //     navigation.replace('VideoDetail');
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, [navigation, dispatch]);

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