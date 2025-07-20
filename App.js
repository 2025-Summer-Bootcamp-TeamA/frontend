import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store/store';
import { selectIsLoggedIn } from './src/store/authSlice';
import MainTabs from './src/navigation/MainTabs';
import LoginScreen from './src/screens/LoginScreen';
import MuseumListScreen from './src/screens/Home/MuseumListScreen';
import Onboarding from './src/screens/Home/Onboarding';
import PhotoUpload from './src/screens/Home/PhotoUpload';
import LoadingScreen from './src/screens/Home/LoadingScreen';
import VideoDetailScreen from './src/screens/Library/VideoDetailScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

function AppContent() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [fontsLoaded] = useFonts({
    'NotoSerif': require('./assets/fonts/NotoSerif-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
        }}
      >
        {!isLoggedIn ? (
          // 로그인하지 않은 경우: 로그인 화면
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{
              gestureEnabled: false, // 로그인 화면에서만 뒤로 가기 제스처 비활성화
            }}
          />
        ) : (
          // 로그인한 경우: 박물관 선택 화면부터 시작
          <>
            <Stack.Screen 
              name="MuseumList" 
              component={MuseumListScreen}
              options={{
                gestureEnabled: false, // 박물관 선택 화면에서 뒤로 가기 제스처 비활성화
              }}
            />
            <Stack.Screen 
              name="MainTabs" 
              component={MainTabs}
              options={{
                gestureEnabled: false, // 메인 화면에서만 뒤로 가기 제스처 비활성화
              }}
            />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="PhotoUpload" component={PhotoUpload} />
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}