import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import LibraryScreen from '../screens/Library/LibraryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import MuseumListScreen from '../screens/Home/MuseumListScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Museums" component={MuseumListScreen} options={{ title: '박물관' }} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}