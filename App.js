import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';

/**
 * Expo 기반 React Native 앱의 메인 컴포넌트로, 로그인 화면을 렌더링합니다.
 * 
 * @returns {JSX.Element} 로그인 화면 컴포넌트
 */
export default function App() {
  return (
    <LoginScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
