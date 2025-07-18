import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './src/navigation/MainTabs';
import Onboarding from './src/screens/Home/Onboarding';
import PhotoUpload from './src/screens/Home/PhotoUpload';
import LoadingScreen from './src/screens/Home/LoadingScreen';
import VideoDetailScreen from './src/screens/Library/VideoDetailScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'NotoSerif': require('./assets/fonts/NotoSerif-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="PhotoUpload" component={PhotoUpload} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}