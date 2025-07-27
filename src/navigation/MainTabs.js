import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import LibraryScreen from '../screens/Library/LibraryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, Image, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainTabs({ route }) {
  // route.params에서 선택된 박물관 정보 가져오기
  const selectedMuseumName = route?.params?.selectedMuseumName;
  const selectedMuseumAddress = route?.params?.selectedMuseumAddress;
  const selectedMuseumPlaceId = route?.params?.selectedMuseumPlaceId;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#232526',
          borderTopWidth: 0.5,
        },
        tabBarActiveTintColor: '#F5F5F7',
        tabBarInactiveTintColor: '#888A8C',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#000000',
          borderBottomColor: '#232526',
          borderBottomWidth: 0.5,
        },
        headerTitleStyle: { color: '#F5F5F7' },
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
      <Tab.Screen name="Library"
        component={LibraryScreen}
        options={{
          headerTitle: () => (
            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold', fontFamily: 'Pretendard-Bold' }}>
              라이브러리
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        options={{
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 2 }}>
              <Image
                source={require('../../assets/logos/homelogo.webp')}
                style={{ width: 120, height: 120, marginLeft: 15, marginTop: 10}}
                resizeMode="contain"
              />
            </View>
          ),
          headerTitle: '',
        }}
      >
        {(props) => <HomeScreen {...props} 
          selectedMuseumName={selectedMuseumName}
          selectedMuseumAddress={selectedMuseumAddress}
          selectedMuseumPlaceId={selectedMuseumPlaceId}
        />}
      </Tab.Screen>
      <Tab.Screen name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => (
            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold', fontFamily: 'Pretendard-Bold' }}>
              프로필
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}