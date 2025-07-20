import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import LibraryScreen from '../screens/Library/LibraryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabs({ route }) {
  // route.params에서 선택된 박물관 이름 가져오기
  const selectedMuseumName = route?.params?.selectedMuseumName;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#222' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        headerShown: true,
        headerStyle: { backgroundColor: '#222' },
        headerTitleStyle: { color: '#fff' },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Library') {
            return <MaterialIcons name="video-library" size={size} color={color} />;
          }
          if (route.name === 'Home') {
            return <Ionicons name="home" size={size} color={color} />;
          }
          if (route.name === 'Profile') {
            return <Ionicons name="person" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} selectedMuseumName={selectedMuseumName} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}