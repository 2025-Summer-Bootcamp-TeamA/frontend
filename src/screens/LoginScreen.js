import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

const backgroundImage = require('../../assets/바탕화면.jpg');
const logo = require('../../assets/앱 로고.png');
const googleLogo = require('../../assets/google-logo.png'); 

const LoginScreen = () => {
  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}> 박물관이 살아있다 </Text>
      {/* 하단 구글 로그인 버튼 */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
          <Image source={googleLogo} style={styles.googleLogo} />
          <Text style={styles.googleButtonText}>Google로 시작하기</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  logo: {
    marginTop: 167,
    alignSelf: 'center',
    width: 180, // 원하는 로고 크기로 조정
    height: 180,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  googleLogo: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 18,
    color: '#444',
    fontWeight: 'bold',
  },
});

export default LoginScreen; 