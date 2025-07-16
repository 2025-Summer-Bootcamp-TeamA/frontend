import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './src/navigation/MainTabs';
import Onboarding1 from './src/screens/Home/Onboarding1';
import Onboarding2 from './src/screens/Home/Onboarding2';
import Onboarding3 from './src/screens/Home/Onboarding3';
import PhotoUpload from './src/screens/Home/PhotoUpload';
import LoadingScreen from './src/screens/Home/LoadingScreen';
import VideoDetailScreen from './src/screens/Library/VideoDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="PhotoUpload" component={PhotoUpload} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
