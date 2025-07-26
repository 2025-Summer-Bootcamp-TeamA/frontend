import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

const backgroundImage = require('../../assets/backgrounds/바탕화면.webp');
const logo = require('../../assets/logos/app_logo.webp');
const googleLogo = require('../../assets/logos/google-logo.webp');

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_ID = '960186760373-0vai1cvuhb3bluc2p4sss8j584vrsgbt.apps.googleusercontent.com';
const IOS_CLIENT_ID = '960186760373-lnd09r1heatjkcu2al10ap182iig8uqo.apps.googleusercontent.com';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
  });

  const handleGoogleLogin = async () => {
    try {
      const res = await promptAsync();
      if (res?.type === 'success' && res.authentication) {
        const idToken = res.authentication.idToken;
        // TODO: idToken을 이용해 백엔드 Google OAuth API 호출 후 accessToken, refreshToken을 받아 처리
        // 예시:
        // const response = await api.googleLogin(idToken);
        // dispatch(login(response.data));
        dispatch(login());
      }
    } catch (error) {
      // 에러 핸들링 (예: Alert로 사용자에게 알림)
      console.error('Google 로그인 에러:', error);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}> 박물관이 살아있다 </Text>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.googleButton} activeOpacity={0.8} onPress={handleGoogleLogin} disabled={!request}>
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
    width: 180,
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

/*
============================
[Mac에서 EAS Build로 Google OAuth 테스트 전체 프로세스]
============================
1. 최신 브랜치(이 코드가 포함된 브랜치) pull
2. Google Cloud Console에서 Web/iOS 클라이언트 ID, 승인된 리디렉션 URI, 번들ID, 테스트 사용자 등록 등 설정 확인
   - Web Application용 클라이언트 ID → expoClientId
   - iOS용 클라이언트 ID → iosClientId
   - 승인된 리디렉션 URI: https://auth.expo.io/@expo-username/app-slug (app.json의 slug, Expo username과 일치)
3. npm install --legacy-peer-deps
4. eas login (Expo 계정)
5. eas build --platform ios
   - Apple Developer 계정 연동 필요
   - 빌드 완료 후 TestFlight 또는 .ipa 파일로 iPhone에 설치
6. 앱 실행 후 "Google로 시작하기" 버튼 클릭
7. Google 로그인 정상 동작 확인
   - Access blocked 등 에러 발생 시 Google Cloud Console 설정(리디렉션 URI, 클라이언트ID, 번들ID, 테스트 사용자 등) 재확인
8. (선택) id_token을 백엔드로 전송해 accessToken/refreshToken 발급 및 연동 테스트
============================
*/ 